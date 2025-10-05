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

const movies = [
  {
    id: '1a7c6f3c-3b5a-4f2a-95a4-7e0a3d91b201',
    title: 'Crimson Odyssey',
    originalTitle: 'Crimson Odyssey',
    duration: 142,
    budget: 120000000,
    revenue: 340000000,
    profit: 220000000,
    sinopsis:
      'In a world on the brink of change, one outsider discovers a secret that could alter fate. Two unlikely allies uncover a conspiracy that reaches the highest echelons of power.',
    genreNames: ['Ação', 'Aventura'],
    language: 'en',
    releaseDate: '2018-06-14T00:00:00.000Z',
    popularity: 8,
    voteAverage: 7,
    voteCount: 18342,
    posterUrl: 'https://picsum.photos/seed/poster_1/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_1/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=KxA7Qp3Zt1M',
  },
  {
    id: '2f0a1a9e-5a2d-46a2-8d1e-9e9f0f3c8b02',
    title: 'Neon Whisper',
    originalTitle: 'Neon Whisper',
    duration: 108,
    budget: 45000000,
    revenue: 129000000,
    profit: 84000000,
    sinopsis:
      'When past and present collide, a reluctant hero must choose between loyalty and truth. As darkness falls, a spark of rebellion ignites a revolution.',
    genreNames: ['Thriller', 'Drama'],
    language: 'en',
    releaseDate: '2020-11-05T00:00:00.000Z',
    popularity: 7,
    voteAverage: 7,
    voteCount: 9215,
    posterUrl: 'https://picsum.photos/seed/poster_2/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_2/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=f1Q2r8ZmL9Y',
  },
  {
    id: '3b2f4c1d-9b0e-4d0e-9fa3-2c44f9a2e803',
    title: 'Midnight Frontier',
    originalTitle: 'Midnight Frontier',
    duration: 127,
    budget: 80000000,
    revenue: 210000000,
    profit: 130000000,
    sinopsis:
      'A desperate mission across unknown lands reveals the fragile bonds that hold us together. In the aftermath of a failed experiment, hope survives in the unlikeliest of places.',
    genreNames: ['Ficção Científica', 'Aventura'],
    language: 'en',
    releaseDate: '2016-03-22T00:00:00.000Z',
    popularity: 6,
    voteAverage: 7,
    voteCount: 15380,
    posterUrl: 'https://picsum.photos/seed/poster_3/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_3/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=QwZ4p_7hGmA',
  },
  {
    id: '4d6e7a1b-2c3d-4e1f-a9a8-8a6d7f9b1c04',
    title: 'Silent Legacy',
    originalTitle: 'Silent Legacy (Original Cut)',
    duration: 115,
    budget: 35000000,
    revenue: 54000000,
    profit: 19000000,
    sinopsis:
      'Haunted by memories, a scientist races against time to stop an unstoppable force. To save their home, a fractured crew must confront what they fear most: themselves.',
    genreNames: ['Drama', 'Thriller'],
    language: 'en',
    releaseDate: '2013-09-18T00:00:00.000Z',
    popularity: 4,
    voteAverage: 7,
    voteCount: 6084,
    posterUrl: 'https://picsum.photos/seed/poster_4/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_4/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=8vY2mBzXcWQ',
  },
  {
    id: '5e9c0a2d-7f1a-4f71-9e7f-3a0f2b7c1d05',
    title: 'Golden Mirage',
    originalTitle: 'Golden Mirage',
    duration: 101,
    budget: 22000000,
    revenue: 68000000,
    profit: 46000000,
    sinopsis:
      'Love and betrayal intertwine as a hidden city emerges from the shadows. In the aftermath of a failed experiment, hope survives in the unlikeliest of places.',
    genreNames: ['Romance', 'Fantasia'],
    language: 'fr',
    releaseDate: '2011-02-11T00:00:00.000Z',
    popularity: 4,
    voteAverage: 6,
    voteCount: 3121,
    posterUrl: 'https://picsum.photos/seed/poster_5/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_5/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=Yt9YdT6fQ0E',
  },
  {
    id: '6a1b2c3d-4e5f-6789-0abc-def123456706',
    title: 'Quantum Signal',
    originalTitle: 'Quantum Signal',
    duration: 136,
    budget: 150000000,
    revenue: 590000000,
    profit: 440000000,
    sinopsis:
      'An ancient signal awakens, drawing explorers into a maze of shifting realities. When past and present collide, a reluctant hero must choose between loyalty and truth.',
    genreNames: ['Ficção Científica', 'Thriller'],
    language: 'en',
    releaseDate: '2023-07-21T00:00:00.000Z',
    popularity: 9,
    voteAverage: 8,
    voteCount: 27450,
    posterUrl: 'https://picsum.photos/seed/poster_6/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_6/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=O0l4aY0Qd2U',
  },
  {
    id: '7bb8a9cc-1122-43de-9f55-2a77b8a0c107',
    title: 'Broken Empire',
    originalTitle: 'Broken Empire',
    duration: 118,
    budget: 60000000,
    revenue: 140000000,
    profit: 80000000,
    sinopsis:
      'Two unlikely allies uncover a conspiracy that reaches the highest echelons of power. As darkness falls, a spark of rebellion ignites a revolution.',
    genreNames: ['Ação', 'Drama'],
    language: 'en',
    releaseDate: '2017-10-27T00:00:00.000Z',
    popularity: 6,
    voteAverage: 7,
    voteCount: 10422,
    posterUrl: 'https://picsum.photos/seed/poster_7/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_7/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=E2rG5bZyVw8',
  },
  {
    id: '8c9d0e1f-2a3b-4c5d-9e6f-7a8b9c0d1e08',
    title: 'Eternal Voyage',
    originalTitle: 'Eternal Voyage',
    duration: 159,
    budget: 180000000,
    revenue: 720000000,
    profit: 540000000,
    sinopsis:
      'A desperate mission across unknown lands reveals the fragile bonds that hold us together. An ancient signal awakens, drawing explorers into a maze of shifting realities.',
    genreNames: ['Aventura', 'Ficção Científica'],
    language: 'en',
    releaseDate: '2021-12-17T00:00:00.000Z',
    popularity: 9,
    voteAverage: 8,
    voteCount: 34590,
    posterUrl: 'https://picsum.photos/seed/poster_8/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_8/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=Z9xLm3Q4H1A',
  },
  {
    id: '9da0eb1c-3d4e-5f6a-8b9c-0d1e2f3a4b09',
    title: 'Shadow Memory',
    originalTitle: 'Shadow Memory (Original Cut)',
    duration: 104,
    budget: 17000000,
    revenue: 24000000,
    profit: 7000000,
    sinopsis:
      'Haunted by memories, a scientist races against time to stop an unstoppable force. In the aftermath of a failed experiment, hope survives in the unlikeliest of places.',
    genreNames: ['Thriller'],
    language: 'de',
    releaseDate: '2010-04-09T00:00:00.000Z',
    popularity: 2,
    voteAverage: 6,
    voteCount: 1894,
    posterUrl: 'https://picsum.photos/seed/poster_9/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_9/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=3gQ8iO5kNfQ',
  },
  {
    id: '10ef11aa-22bb-33cc-44dd-55ee66ff7710',
    title: 'Forgotten Horizon',
    originalTitle: 'Forgotten Horizon',
    duration: 126,
    budget: 95000000,
    revenue: 305000000,
    profit: 210000000,
    sinopsis:
      'In a world on the brink of change, one outsider discovers a secret that could alter fate. To save their home, a fractured crew must confront what they fear most: themselves.',
    genreNames: ['Fantasia', 'Aventura'],
    language: 'en',
    releaseDate: '2015-08-28T00:00:00.000Z',
    popularity: 5,
    voteAverage: 7,
    voteCount: 11877,
    posterUrl: 'https://picsum.photos/seed/poster_10/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_10/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=Hh2YcP4VbXo',
  },
  {
    id: '11aa22bb-33cc-44dd-55ee-66ff77aa8811',
    title: 'Hidden Promise',
    originalTitle: 'Hidden Promise',
    duration: 95,
    budget: 12000000,
    revenue: 38000000,
    profit: 26000000,
    sinopsis:
      'Love and betrayal intertwine as a hidden city emerges from the shadows. When past and present collide, a reluctant hero must choose between loyalty and truth.',
    genreNames: ['Romance', 'Drama'],
    language: 'es',
    releaseDate: '2012-05-03T00:00:00.000Z',
    popularity: 3,
    voteAverage: 6,
    voteCount: 4210,
    posterUrl: 'https://picsum.photos/seed/poster_11/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_11/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=J2Zc7mQkP3s',
  },
  {
    id: '12bb23cc-34dd-45ee-56ff-67aa78bb9912',
    title: 'Eternal Code',
    originalTitle: 'Eternal Code',
    duration: 132,
    budget: 110000000,
    revenue: 455000000,
    profit: 345000000,
    sinopsis:
      'An ancient signal awakens, drawing explorers into a maze of shifting realities. Two unlikely allies uncover a conspiracy that reaches the highest echelons of power.',
    genreNames: ['Ficção Científica'],
    language: 'en',
    releaseDate: '2019-03-08T00:00:00.000Z',
    popularity: 8,
    voteAverage: 8,
    voteCount: 20984,
    posterUrl: 'https://picsum.photos/seed/poster_12/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_12/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=7aXbC0QvN2A',
  },
  {
    id: '13cc34dd-45ee-56ff-67aa-78bb89cc0a13',
    title: 'First Voyage',
    originalTitle: 'First Voyage',
    duration: 99,
    budget: 25000000,
    revenue: 92000000,
    profit: 67000000,
    sinopsis:
      'A desperate mission across unknown lands reveals the fragile bonds that hold us together. As darkness falls, a spark of rebellion ignites a revolution.',
    genreNames: ['Aventura'],
    language: 'en',
    releaseDate: '2009-11-20T00:00:00.000Z',
    popularity: 3,
    voteAverage: 6,
    voteCount: 5888,
    posterUrl: 'https://picsum.photos/seed/poster_13/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_13/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=Gq1nZk8TtRw',
  },
  {
    id: '14dd45ee-56ff-67aa-78bb-89cc90dd1b14',
    title: 'Fading Sky',
    originalTitle: 'Fading Sky (Original Cut)',
    duration: 107,
    budget: 30000000,
    revenue: 27000000,
    profit: -3000000,
    sinopsis:
      'Haunted by memories, a scientist races against time to stop an unstoppable force. In the aftermath of a failed experiment, hope survives in the unlikeliest of places.',
    genreNames: ['Drama', 'Ficção Científica'],
    language: 'it',
    releaseDate: '2014-01-24T00:00:00.000Z',
    popularity: 2,
    voteAverage: 6,
    voteCount: 2241,
    posterUrl: 'https://picsum.photos/seed/poster_14/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_14/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=1vB9oQeLxNg',
  },
  {
    id: '15ee56ff-67aa-78bb-89cc-90dd01ee2c15',
    title: 'Whisper of Empire',
    originalTitle: 'Whisper of Empire',
    duration: 123,
    budget: 70000000,
    revenue: 198000000,
    profit: 128000000,
    sinopsis:
      'Two unlikely allies uncover a conspiracy that reaches the highest echelons of power. In a world on the brink of change, one outsider discovers a secret that could alter fate.',
    genreNames: ['Ação', 'Thriller'],
    language: 'en',
    releaseDate: '2018-04-06T00:00:00.000Z',
    popularity: 7,
    voteAverage: 7,
    voteCount: 13220,
    posterUrl: 'https://picsum.photos/seed/poster_15/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_15/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=Vf7eQp9LhJY',
  },
  {
    id: '16ff67aa-78bb-89cc-90dd-01ee12ff3d16',
    title: 'Mirage of Dreams',
    originalTitle: 'Mirage of Dreams',
    duration: 112,
    budget: 42000000,
    revenue: 114000000,
    profit: 72000000,
    sinopsis:
      'Love and betrayal intertwine as a hidden city emerges from the shadows. To save their home, a fractured crew must confront what they fear most: themselves.',
    genreNames: ['Romance', 'Fantasia'],
    language: 'pt',
    releaseDate: '2016-02-19T00:00:00.000Z',
    popularity: 3,
    voteAverage: 7,
    voteCount: 5120,
    posterUrl: 'https://picsum.photos/seed/poster_16/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_16/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=Pn3lXy4RtQk',
  },
  {
    id: '17aa78bb-89cc-90dd-01ee-12ff23aa4e17',
    title: 'Last Signal',
    originalTitle: 'Last Signal',
    duration: 138,
    budget: 125000000,
    revenue: 510000000,
    profit: 385000000,
    sinopsis:
      'An ancient signal awakens, drawing explorers into a maze of shifting realities. When past and present collide, a reluctant hero must choose between loyalty and truth.',
    genreNames: ['Ficção Científica', 'Aventura'],
    language: 'en',
    releaseDate: '2022-07-08T00:00:00.000Z',
    popularity: 9,
    voteAverage: 8,
    voteCount: 29811,
    posterUrl: 'https://picsum.photos/seed/poster_17/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_17/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=rD5mQe8HsV0',
  },
  {
    id: '18bb89cc-90dd-01ee-12ff-23aa34bb5f18',
    title: 'Shadow of the Pulse',
    originalTitle: 'Shadow of the Pulse',
    duration: 116,
    budget: 52000000,
    revenue: 158000000,
    profit: 106000000,
    sinopsis:
      'In a world on the brink of change, one outsider discovers a secret that could alter fate. As darkness falls, a spark of rebellion ignites a revolution.',
    genreNames: ['Ação'],
    language: 'en',
    releaseDate: '2017-01-13T00:00:00.000Z',
    popularity: 5,
    voteAverage: 7,
    voteCount: 8202,
    posterUrl: 'https://picsum.photos/seed/poster_18/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_18/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=Qe4nLt6Jc2A',
  },
  {
    id: '19cc90dd-01ee-12ff-23aa-34bb45cc6a19',
    title: 'Echo in the City',
    originalTitle: 'Echo in the City',
    duration: 102,
    budget: 18000000,
    revenue: 49000000,
    profit: 31000000,
    sinopsis:
      'When past and present collide, a reluctant hero must choose between loyalty and truth. Love and betrayal intertwine as a hidden city emerges from the shadows.',
    genreNames: ['Drama', 'Romance'],
    language: 'ru',
    releaseDate: '2008-09-12T00:00:00.000Z',
    popularity: 2,
    voteAverage: 6,
    voteCount: 2750,
    posterUrl: 'https://picsum.photos/seed/poster_19/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_19/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=5YtMbK2nZq8',
  },
  {
    id: '20dd01ee-12ff-23aa-34bb-45cc56dd7b20',
    title: 'Sky of the Forgotten',
    originalTitle: 'Sky of the Forgotten',
    duration: 147,
    budget: 135000000,
    revenue: 475000000,
    profit: 340000000,
    sinopsis:
      'A desperate mission across unknown lands reveals the fragile bonds that hold us together. To save their home, a fractured crew must confront what they fear most: themselves.',
    genreNames: ['Fantasia', 'Aventura'],
    language: 'en',
    releaseDate: '2019-05-24T00:00:00.000Z',
    popularity: 7,
    voteAverage: 7,
    voteCount: 16744,
    posterUrl: 'https://picsum.photos/seed/poster_20/600/900',
    coverUrl: 'https://picsum.photos/seed/cover_20/1600/900',
    trailerUrl: 'https://www.youtube.com/watch?v=0kTnZb4XyWc',
  },
]

async function main() {
  console.log('🌱 Starting seed...')

  // 1) Limpar dados respeitando FKs (MovieGenre -> Movie -> Genre -> User)
  await prisma.$executeRaw`DELETE FROM "MovieGenre"`
  await prisma.movie.deleteMany()
  await prisma.genre.deleteMany()
  await prisma.user.deleteMany()

  // 2) Criar usuários
  const [testUser, testUser2] = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Sample User',
        email: 'sample@sample.com',
        passwordHash: await hashPassword('123456'),
      },
    }),
    prisma.user.create({
      data: {
        name: 'Another User',
        email: 'another@sample.com',
        passwordHash: await hashPassword('123456'),
      },
    }),
  ])

  console.log('✅ Test user created:', testUser.email)
  console.log('✅ Test user 2 created:', testUser2.email)

  // 3) Criar gêneros
  const createdGenres: { id: string; name: string }[] = []
  for (const g of genres) {
    const created = await prisma.genre.create({ data: g })
    createdGenres.push(created)
  }
  console.log(`✅ ${createdGenres.length} genres created`)

  // Mapa de nome -> id para facilitar lookup
  const genreMap = new Map(createdGenres.map((g) => [g.name, g.id]))

  // 4) Criar filmes e conectar gêneros via MovieGenre
  for (let i = 0; i < movies.length; i++) {
    const m = movies[i]
    const ownerId = i % 2 === 0 ? testUser.id : testUser2.id

    // Criar o filme
    await prisma.movie.create({
      data: {
        id: m.id,
        title: m.title,
        originalTitle: m.originalTitle,
        duration: m.duration,
        budget: m.budget,
        revenue: m.revenue,
        profit: m.profit,
        sinopsis: m.sinopsis,
        language: m.language,
        releaseDate: new Date(m.releaseDate),
        popularity: m.popularity,
        voteAverage: m.voteAverage,
        voteCount: m.voteCount,
        posterUrl: m.posterUrl,
        coverUrl: m.coverUrl,
        trailerUrl: m.trailerUrl,
        userId: ownerId,
        // Conectar gêneros via MovieGenre
        movieGenres: {
          create: m.genreNames
            .map((gName) => {
              const genreId = genreMap.get(gName)
              if (!genreId) {
                console.warn(
                  `⚠️  Genre "${gName}" not found for movie "${m.title}"`,
                )
                return null
              }
              return { genreId }
            })
            .filter((x) => x !== null) as { genreId: string }[],
        },
      },
    })
  }

  console.log(`✅ ${movies.length} movies created with genres`)
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
