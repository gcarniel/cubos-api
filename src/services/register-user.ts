import { ConflictError } from "@/errors/conflict-error.js";
import { hashPassword } from "../lib/crypto.js";
import { prisma } from "../lib/prisma.js";
import type { RegisterUserInput } from "../schemas/auth.schema.js";

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
