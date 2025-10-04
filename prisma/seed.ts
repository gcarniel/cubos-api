import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/crypto.js'

const prisma = new PrismaClient()

const genres = [
  { name: 'Ação' },
  { name: 'Aventura' },
  { name: 'Animação' },
  { name: 'Biografia' },
  { name: 'Comédia' },
  { name: 'Comédia Romântica' },
  { name: 'Crime' },
  { name: 'Documentário' },
  { name: 'Drama' },
  { name: 'Esporte' },
  { name: 'Família' },
  { name: 'Fantasia' },
  { name: 'Faroeste' },
  { name: 'Ficção Científica' },
  { name: 'Guerra' },
  { name: 'Histórico' },
  { name: 'Mistério' },
  { name: 'Musical' },
  { name: 'Policial' },
  { name: 'Político' },
  { name: 'Religioso' },
  { name: 'Romance' },
  { name: 'Suspense' },
  { name: 'Terror' },
  { name: 'Thriller' },
  { name: 'Noir' },
  { name: 'Experimental' },
  { name: 'Curta-Metragem' },
  { name: 'Super-Herói' },
]

async function main() {
  console.log('🌱 Starting seed...')
  await prisma.user.deleteMany()
  await prisma.genre.deleteMany()
  await prisma.movie.deleteMany()

  // Create test user
  const testUser = await prisma.user.create({
    data: {
      name: 'Sample User',
      email: 'sample@sample.com',
      passwordHash: await hashPassword('123456'),
    },
  })

  const genre = await prisma.genre.createMany({
    data: genres,
  })

  console.log('✅ Test user created:', testUser.email)

  console.log('🎉 Seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
