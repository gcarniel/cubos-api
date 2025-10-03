import { z } from "zod";

// Auth Schemas
export const registerUserSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
    email: z.email("Email inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export const loginSchema = z
  .object({
    email: z.email("Email inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  });

export const loginOutputSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
  }),
  token: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type LoginOutput = z.infer<typeof loginOutputSchema>;