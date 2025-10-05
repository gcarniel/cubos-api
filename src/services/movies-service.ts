import { ConflictError } from '@/errors/conflict-error.js'
import type {
  MovieListParamsInput,
  MovieRegisterInput,
  MovieUpdateInput,
} from '@/schemas/movies.schema.js'
import { prisma } from '../lib/prisma.js'
import { NotFoundError } from '@/errors/not-found-error.js'
import { UnauthorizedError } from '@/errors/unauthorized-error.js'

export async function createMovieService(
  movie: MovieRegisterInput,
  userId: string,
) {
  const existingMovie = await prisma.movie.findFirst({
    where: { title: movie.title },
  })

  if (existingMovie) {
    throw new ConflictError('Filme já cadastrado com esse título')
  }

  const createdMovie = await prisma.movie.create({
    data: {
      title: movie.title,
      originalTitle: movie.originalTitle,
      duration: movie.duration,
      budget: movie.budget,
      revenue: movie.revenue,
      profit: movie.profit,
      sinopsis: movie.sinopsis,
      language: movie.language,
      releaseDate: movie.releaseDate,
      popularity: movie.popularity,
      voteAverage: movie.voteAverage,
      voteCount: movie.voteCount,
      posterUrl: movie.posterUrl,
      coverUrl: movie.coverUrl || null,
      trailerUrl: movie.trailerUrl,
      userId,
      movieGenres: {
        create: movie.genre.map((genre) => ({
          genreId: genre.id,
        })),
      },
    },
  })

  return { id: createdMovie.id }
}

export async function updateMovieService(
  movie: MovieUpdateInput,
  userId: string,
) {
  const foundMovie = await prisma.movie.findFirst({
    where: { id: movie.id },
  })

  if (!foundMovie) {
    throw new NotFoundError('Filme não encontrado')
  }

  if (foundMovie.userId !== userId) {
    throw new UnauthorizedError(
      'Você não tem permissão para atualizar esse filme',
    )
  }

  const existingMovie = await prisma.movie.findFirst({
    where: { title: movie.title, id: { not: movie.id } },
  })

  if (existingMovie) {
    throw new ConflictError('Filme já cadastrado com esse título')
  }

  const updatedMovie = await prisma.movie.update({
    where: { id: movie.id },
    data: {
      title: movie.title,
      originalTitle: movie.originalTitle,
      duration: movie.duration,
      budget: movie.budget,
      revenue: movie.revenue,
      profit: movie.profit,
      sinopsis: movie.sinopsis,
      language: movie.language,
      releaseDate: movie.releaseDate,
      popularity: movie.popularity,
      voteAverage: movie.voteAverage,
      voteCount: movie.voteCount,
      posterUrl: movie.posterUrl,
      coverUrl: movie.coverUrl || null,
      trailerUrl: movie.trailerUrl,
      movieGenres: {
        deleteMany: {
          movieId: foundMovie.id,
        },
        create: movie.genre.map((genre) => ({
          genreId: genre.id,
        })),
      },
    },
  })

  return { id: updatedMovie.id }
}

export async function listMoviesService(params: MovieListParamsInput) {
  const {
    search,
    page,
    take,
    minRating,
    maxRating,
    minReleaseDate,
    maxReleaseDate,
    minDuration,
    maxDuration,
    sort,
    orderBy,
  } = params

  const takeNum = Math.min(Math.max(parseInt(String(take)) || 10, 1), 100) // limite de 100
  const pageNum = Math.max(parseInt(String(page)) || 1, 1)
  const skipNum = (pageNum - 1) * takeNum

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {}

  if (search) {
    where.OR = [
      { title: { contains: String(search), mode: 'insensitive' } },
      { originalTitle: { contains: String(search), mode: 'insensitive' } },
    ]
  }

  if (minRating && maxRating) {
    where.rating = {}
    if (minRating) where.rating.gte = Number(minRating)
    if (maxRating) where.rating.lte = Number(maxRating)
  }

  if (minReleaseDate && maxReleaseDate) {
    where.releaseDate = {}
    if (minReleaseDate) where.releaseDate.gte = minReleaseDate
    if (maxReleaseDate) where.releaseDate.lte = maxReleaseDate
  }

  if (minDuration && maxDuration) {
    where.duration = {}
    if (minDuration) where.duration.gte = Number(minDuration)
    if (maxDuration) where.duration.lte = Number(maxDuration)
  }

  const allowedSortFields = new Set([
    'createdAt',
    'title',
    'rating',
    'releaseYear',
    'originalTitle',
    'duration',
    'budget',
    'revenue',
    'profit',
    'popularity',
    'voteAverage',
    'voteCount',
    'posterUrl',
    'coverUrl',
    'trailerUrl',
  ])
  const orderByField = allowedSortFields.has(orderBy ?? 'releaseDate')
    ? orderBy
    : 'releaseDate'

  const [movies, totalMovies] = await Promise.all([
    prisma.movie.findMany({
      where,
      include: {
        movieGenres: {
          include: {
            genre: true,
          },
        },
        user: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        [orderByField || 'releaseDate']: sort,
      },
      take: takeNum,
      skip: skipNum,
    }),

    prisma.movie.count({
      where,
    }),
  ])

  return {
    movies,
    totalMovies,
    totalPages: Math.ceil(totalMovies / takeNum),
    currentPage: Math.floor(skipNum / takeNum) + 1,
    hasNextPage: skipNum + takeNum < totalMovies,
    hasPreviousPage: skipNum > 0,
  }
}

export async function getMovieByIdService(id: string) {
  const movie = await prisma.movie.findUnique({
    where: {
      id,
    },
    include: {
      movieGenres: {
        include: {
          genre: true,
        },
      },
      user: {
        select: {
          id: true,
        },
      },
    },
  })

  if (!movie) {
    throw new NotFoundError('Filme não encontrado')
  }

  return movie
}

export async function deleteMovieService(id: string, userId: string) {
  const movie = await prisma.movie.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  })

  if (!movie) {
    throw new NotFoundError('Filme não encontrado')
  }

  if (movie.user.id !== userId) {
    throw new UnauthorizedError(
      'Você não tem permissão para deletar esse filme',
    )
  }

  await prisma.movieGenre.deleteMany({
    where: { movieId: id },
  })

  await prisma.movie.delete({
    where: {
      id,
    },
  })
}

export async function listGenresService() {
  const genres = await prisma.genre.findMany()

  return genres
}
