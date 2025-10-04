// src/jobs/movieReleaseJob.js
import cron from 'node-cron'
import { prisma } from '../lib/prisma.js'
import { sendEmail } from './mail-service.js'
import { buildEmailHtml, chunk, sleep } from '@/lib/utils.js'
import type { Prisma } from '@prisma/client'

export type MovieWithUser = Prisma.MovieGetPayload<{
  include: {
    user: true
  }
}>

export function setupMovieReleaseCron() {
  // Executa todos os dias às 5h da manhã
  cron.schedule('0 5 * * *', async () => {
    console.log('Verificando lançamentos de filmes do dia...')

    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      const releasedMovies = await prisma.movie.findMany({
        where: {
          releaseDate: {
            gte: today,
            lt: tomorrow,
          },
        },
        include: {
          user: true,
        },
      })

      const byUser = new Map<
        string,
        { user: MovieWithUser['user']; movies: MovieWithUser[] }
      >()
      for (const movie of releasedMovies) {
        const cuid = String(movie.user.id)
        if (!byUser.has(cuid)) {
          byUser.set(cuid, { user: movie.user, movies: [] })
        }
        byUser.get(cuid)!.movies.push(movie)
      }

      const userGroups = Array.from(byUser.values())

      for (const batch of chunk(userGroups, 2)) {
        await Promise.all(
          batch.map(async ({ user, movies }) => {
            const html = buildEmailHtml(user.name, movies)

            if (!movies?.length) return

            await sendEmail({
              to: user.email,
              subject:
                movies.length === 1
                  ? `Novo lançamento de filme: ${movies?.[0]?.title}`
                  : `Novos lançamentos de filmes (${movies?.length})`,
              html,
            })
          }),
        )
        await sleep(1000)
      }
    } catch (error) {
      console.error('Erro ao verificar lançamentos:', error)
    }
  })

  console.log('⏰ Cron job de lançamentos configurado ⏰ \n')
}
