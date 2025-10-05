import {
  genreSchema,
  movieGetByIdSchema,
  movieListOutputSchema,
  movieListParamsSchema,
  movieRegisterSchema,
  movieUpdateSchema,
} from '@/schemas/movies.schema.js'
import {
  createMovieService,
  deleteMovieService,
  getMovieByIdService,
  listGenresService,
  listMoviesService,
  updateMovieService,
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

  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: {
        tags: ['Movies'],
        description: 'Atualizar um filme',
        security: [{ bearerAuth: [] }],
        body: movieUpdateSchema,
        response: {
          200: z.object({ id: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const userId = request.userId
      await updateMovieService(request.body, userId)

      return reply.status(200).send({ id: request.body.id })
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
        user: {
          id: movie.user.id,
          name: movie.user.name,
        },
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
    '/:id',
    {
      schema: {
        tags: ['Movies'],
        description: 'Recuperar um filme',
        security: [{ bearerAuth: [] }],
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: movieGetByIdSchema,
          404: z.void(),
        },
      },
    },
    async (request, reply) => {
      const movie = await getMovieByIdService(request.params.id)

      return reply.status(200).send({
        ...movie,
        user: {
          id: movie.user.id,
          name: movie.user.name,
        },
        genre: movie.movieGenres.map((movieGenre) =>
          genreSchema.parse(movieGenre.genre),
        ),
        coverUrl: movie.coverUrl || undefined,
        releaseDate: movie.releaseDate.toISOString(),
      })
    },
  )

  app.withTypeProvider<ZodTypeProvider>().delete(
    '/:id',
    {
      schema: {
        tags: ['Movies'],
        description: 'Deletar um filme',
        security: [{ bearerAuth: [] }],
        params: z.object({
          id: z.string(),
        }),
        response: {
          204: z.void(),
        },
      },
    },
    async (request, reply) => {
      const userId = request.userId
      await deleteMovieService(request.params.id, userId)

      return reply.status(204).send()
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
