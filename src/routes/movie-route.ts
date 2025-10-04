import { genreSchema, movieRegisterSchema } from '@/schemas/movies.schema.js'
import {
  createMovieService,
  listGenresService,
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
