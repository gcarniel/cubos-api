import { ConflictError } from '@/errors/conflict-error.js'
import { comparePassword, hashPassword } from '../lib/crypto.js'
import { prisma } from '../lib/prisma.js'
import type { LoginInput, RegisterUserInput } from '../schemas/auth.schema.js'
import { NotFoundError } from '@/errors/not-found-error.js'
import { sendEmail } from './mail-service.js'
import { env } from '@/env.js'

export async function registerUserService({
  name,
  email,
  password,
}: RegisterUserInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    throw new ConflictError('Email já cadastrado')
  }

  const passwordHash = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  })

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

export async function loginUserService({ email, password }: LoginInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (!existingUser) {
    throw new NotFoundError('Credenciais inválidas')
  }

  const isPasswordValid = await comparePassword(
    password,
    existingUser.passwordHash,
  )

  if (!isPasswordValid) {
    throw new NotFoundError('Credenciais inválidas')
  }

  return {
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
  }
}

export async function forgotPasswordUserService(email: string) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (!existingUser) {
    throw new NotFoundError('Credenciais inválidas')
  }

  const token = crypto.randomUUID()

  await prisma.token.create({
    data: {
      userId: existingUser.id,
      token,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    },
  })

  await sendEmail({
    to: existingUser.email,
    subject: 'Recuperação de senha',
    html: `Clique no link para recuperação de senha: <a href="${env.FRONTEND_URL}/recover-password?token=${token}">Recuperar senha</a>`,
  })

  return {
    id: existingUser.id,
  }
}

export async function resetPasswordUserService(
  token: string,
  password: string,
) {
  const existingToken = await prisma.token.findFirst({
    where: { token },
  })

  if (!existingToken) {
    throw new NotFoundError('Token inválido')
  }

  const isTokenExpired = existingToken.expiresAt < new Date()

  if (isTokenExpired) {
    throw new NotFoundError('Token expirado')
  }

  const passwordHash = await hashPassword(password)

  await prisma.user.update({
    where: { id: existingToken.userId },
    data: { passwordHash },
  })

  await prisma.token.delete({
    where: { id: existingToken.id },
  })

  return {
    id: existingToken.userId,
  }
}
