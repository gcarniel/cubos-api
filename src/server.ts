import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.js";
import { authRoutes} from "./routes/auth-route.js";
import { errorHandler } from "./errors/error-handler.js";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.setErrorHandler(errorHandler)

app.register(fastifyCors);

app.register(authRoutes, {prefix: '/auth'})

app.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

app.listen({ port: env.PORT, host: env.HOST }).then(() => {
  console.log("HTTP server running!");
});
