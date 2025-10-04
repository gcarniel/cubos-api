import { UnauthorizedError } from '@/errors/unauthorized-error.js'
import type { FastifyInstance } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

declare module 'fastify' {
  interface FastifyRequest {
    userId: string
  }
}

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('onRequest', async (request) => {
    try {
      const token = await request.jwtVerify<{ sub: string }>()

      request.userId = token.sub

      return token.sub
    } catch (err) {
      throw new UnauthorizedError('Invalid token')
    }
  })
})
