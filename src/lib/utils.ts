import type { MovieWithUser } from '@/services/movies-chron-service.js'

export function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function buildEmailHtml(userName: string, movies: MovieWithUser[]) {
  const items = movies
    .map(
      (m) =>
        `<li><strong>${m.title}</strong> — ${new Date(m.releaseDate).toLocaleDateString('pt-BR')}</li>`,
    )
    .join('')
  return `
  <div>
    <p>Olá, ${userName}!</p>
    <p>Temos ${movies.length} lançamento(s) de filme hoje para você:</p>
    <ul>${items}</ul>
    <p>Bom proveito!</p>
  </div>
  `
}
