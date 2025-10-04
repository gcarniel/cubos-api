import {
  genreSchema,
  movieListOutputSchema,
  movieListParamsSchema,
  movieRegisterSchema,
} from '@/schemas/movies.schema.js'
import {
  createMovieService,
  listGenresService,
  listMoviesService,
} from '@/services/movies-service.js'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function moviesRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        tags: ['Movies'],
        description: 'Criar um novo filme',
        security: [{ bearerAuth: [] }],
        body: movieRegisterSchema,
        response: {
          201: z.void(),
        },
      },
    },
    async (request, reply) => {
      const userId = request.userId
      await createMovieService(request.body, userId)

      return reply.status(201).send()
    },
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        tags: ['Movies'],
        description: 'Listar todos os filmes',
        security: [{ bearerAuth: [] }],
        querystring: movieListParamsSchema,
        response: {
          200: movieListOutputSchema,
        },
      },
    },
    async (request, reply) => {
      const {
        movies,
        totalMovies,
        totalPages,
        currentPage,
        hasNextPage,
        hasPreviousPage,
      } = await listMoviesService({
        search: request.query.search || '',
        page: request.query.page,
        take: request.query.take,
        minRating: request.query.minRating,
        maxRating: request.query.maxRating,
        minDuration: request.query.minDuration,
        maxDuration: request.query.maxDuration,
        minReleaseDate: request.query.minReleaseDate,
        maxReleaseDate: request.query.maxReleaseDate,
        sort: request.query.sort,
      })

      const moviesWithGenres = movies.map((movie) => ({
        ...movie,
        userId: movie.user.id,
        genre: movie.movieGenres.map((movieGenre) =>
          genreSchema.parse(movieGenre.genre),
        ),
        coverUrl: movie.coverUrl || undefined,
        releaseDate: movie.releaseDate.toISOString(),
      }))

      return reply.status(200).send({
        movies: moviesWithGenres,
        totalMovies,
        totalPages,
        currentPage,
        hasNextPage,
        hasPreviousPage,
      })
    },
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/genres',
    {
      schema: {
        tags: ['Movies'],
        description: 'Listar todos os gêneros',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.array(genreSchema),
        },
      },
    },
    async (request, reply) => {
      const genres = await listGenresService()

      return reply.status(200).send(genres)
    },
  )
}
