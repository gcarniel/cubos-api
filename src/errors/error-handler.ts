import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { AppError } from './app-error.js'
import { ZodError, } from 'zod'

type FastifyErrorHandler = FastifyInstance['errorHandler']

  export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      error: error.name,
      message: error.message,
      statusCode: error.statusCode,
    })
  }

  if (error.constructor.name === 'PrismaClientKnownRequestError') {
    const prismaError = error as any
    
    if (prismaError.code === 'P2002') {
      return reply.status(409).send({
        error: 'ConflictError',
        message: 'Já existe um registro com esses dados',
      })
    }

    if (prismaError.code === 'P2025') {
      return reply.status(404).send({
        error: 'NotFoundError',
        message: 'Registro não encontrado',
      })
    }
  }

  if (error instanceof ZodError) {
    reply.status(400).send({
      message: 'Validation error',
      issues: (error as any).issues,
    })
  }

if (error?.code === 'FST_ERR_VALIDATION') {
  console.log(error)
  return reply.status(400).send({
    message: 'Validation error',
    errors: error.validation?.map((v: any) => ({
      path: v.instancePath,
      message: v.message,
      keyword: v.keyword,
    })),
  });
}

  console.error('Unexpected error:', error)

  return reply.status(500).send({
    error: 'InternalServerError',
    message: 'Erro interno do servidor',
  })
}
