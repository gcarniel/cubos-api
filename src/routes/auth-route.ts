import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  loginOutputSchema,
  loginSchema,
  registerUserSchema,
} from '../schemas/auth.schema.js'
import {
  forgotPasswordUserService,
  loginUserService,
  registerUserService,
  resetPasswordUserService,
} from '../services/auth-service.js'
import z from 'zod'

export async function authRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/register',
    {
      schema: {
        tags: ['Auth'],
        description: 'Criar uma nova conta de usuário',
        body: registerUserSchema,
        response: {
          201: z.void(),
        },
      },
    },
    async (request, reply) => {
      await registerUserService(request.body)

      return reply.status(201).send()
    },
  )

  app.withTypeProvider<ZodTypeProvider>().post(
    '/forgot-password',
    {
      schema: {
        tags: ['Auth'],
        description: 'Enviar e-mail de recuperação de senha',
        body: z.object({ email: z.email() }),
        response: {
          200: z.void(),
        },
      },
    },
    async (request, reply) => {
      await forgotPasswordUserService(request.body.email)

      return reply.status(200).send()
    },
  )

  app.withTypeProvider<ZodTypeProvider>().post(
    '/reset-password',
    {
      schema: {
        tags: ['Auth'],
        description: 'Resetar senha',
        body: z.object({
          token: z.uuid(),
          password: z.string(),
          passwordConfirmation: z.string(),
        }),
        response: {
          200: z.void(),
        },
      },
    },
    async (request, reply) => {
      const { token, password, passwordConfirmation } = request.body
      console.log({ token, password, passwordConfirmation })

      await resetPasswordUserService(token, password)

      return reply.status(200).send()
    },
  )

  app.withTypeProvider<ZodTypeProvider>().post(
    '/login',
    {
      schema: {
        tags: ['Auth'],
        description: 'Fazer login',
        body: loginSchema,
        response: {
          200: loginOutputSchema,
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body
      const data = await loginUserService({ email, password })

      const user = {
        id: data.id,
        name: data.name,
        email: data.email,
      }

      const token = await reply.jwtSign(
        { sub: data.id },
        { sign: { expiresIn: '7d' } },
      )

      return reply.status(200).send({ user, token })
    },
  )
}
