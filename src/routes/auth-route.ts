import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { registerUserSchema } from "../schemas/auth.schema.js";
import { registerUserService } from "../services/register-user.js";
import z from "zod";

export async function authRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/register",
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
      await registerUserService(request.body);

      return reply.status(201).send();
    },
  );
}
