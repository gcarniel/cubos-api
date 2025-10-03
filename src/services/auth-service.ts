import { ConflictError } from "@/errors/conflict-error.js";
import { comparePassword, hashPassword } from "../lib/crypto.js";
import { prisma } from "../lib/prisma.js";
import type { LoginInput, RegisterUserInput } from "../schemas/auth.schema.js";
import { NotFoundError } from "@/errors/not-found-error.js";

export async function registerUserService({
  name,
  email,
  password,
}: RegisterUserInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ConflictError("Email já cadastrado");
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function loginUserService({
  email,
  password,
}: LoginInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    throw new NotFoundError("Credenciais inválidas");
  }

  const isPasswordValid = await comparePassword(password, existingUser.passwordHash);

  if (!isPasswordValid) {
    throw new NotFoundError("Credenciais inválidas");
  }


  return {
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
  };
}
