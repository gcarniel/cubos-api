import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import type { MultipartFile } from '@fastify/multipart'
import { uploadFile } from '@/services/files-service.js'

export async function filesRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/upload',
    {
      schema: {
        tags: ['Files'],
        description: 'Upload de arquivo',
        security: [{ bearerAuth: [] }],
        consumes: ['multipart/form-data'],
        response: {
          201: z.object({
            url: z.string().url(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const filePart: MultipartFile | undefined = await request.file({
        limits: {
          fileSize: 5 * 1024 * 1024, // 5MB
        },
      })

      if (!filePart) {
        return reply.status(400).send({ message: 'Campo "file" é obrigatório' })
      }

      const { filename, mimetype, file } = filePart

      const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      if (!allowed.includes(mimetype)) {
        return reply
          .status(400)
          .send({ message: 'Tipo de arquivo não permitido' })
      }

      const uploaded = await uploadFile({
        file,
        filename,
        mimetype,
      })

      return reply.status(201).send({ url: uploaded.url })
    },
  )
}
