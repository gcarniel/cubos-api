import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { loginOutputSchema, loginSchema, registerUserSchema } from "../schemas/auth.schema.js";
import { loginUserService, registerUserService } from "../services/auth-service.js";
import z from "zod";
import { env } from "@/env.js";

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

  app.withTypeProvider<ZodTypeProvider>().post(
    "/login",
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
      const { email, password } = request.body;
      const data = await loginUserService({ email, password });

      const user = {
        id: data.id,
        name: data.name,
        email: data.email,
      };
      
      const token = await reply.jwtSign({ sub: data.id }, {sign: {expiresIn: '7d'}});

      return reply.status(200).send({ user, token });
    },
  );
}
