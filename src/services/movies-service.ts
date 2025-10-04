import { ConflictError } from '@/errors/conflict-error.js'
import type { MovieRegisterInput } from '@/schemas/movies.schema.js'
import { prisma } from '../lib/prisma.js'

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

export async function listGenresService() {
  const genres = await prisma.genre.findMany()

  return genres
}
