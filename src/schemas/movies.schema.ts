import { z } from 'zod'

export const genreSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const movieRegisterSchema = z.object({
  title: z.string().min(1, 'Campo título é obrigatório'),
  originalTitle: z.string().min(1, 'Campo título original é obrigatório'),
  duration: z.number().min(1, 'Campo duração é obrigatório'),
  budget: z.number().min(1, 'Campo orçamento é obrigatório'),
  revenue: z.number().min(1, 'Campo receita é obrigatório'),
  profit: z.number().min(1, 'Campo lucro é obrigatório'),
  sinopsis: z.string().min(1, 'Campo sinopse é obrigatório'),
  genre: z.array(genreSchema).min(1, 'Campo gênero é obrigatório'),
  language: z.string().min(1, 'Campo idioma é obrigatório'),
  releaseDate: z.string().min(1, 'Campo data de lançamento é obrigatório'),
  popularity: z.number().min(1, 'Campo popularidade é obrigatório'),
  voteAverage: z.number().min(1, 'Campo média de votos é obrigatório'),
  voteCount: z.number().min(1, 'Campo contagem de votos é obrigatório'),
  posterUrl: z.url(),
  coverUrl: z.url().optional(),
  trailerUrl: z.url({ message: 'Campo link do trailer é obrigatório' }),
})

export const movieUpdateSchema = movieRegisterSchema.extend({ id: z.string() })

export type MovieRegisterInput = z.infer<typeof movieRegisterSchema>
export type MovieUpdateInput = z.infer<typeof movieUpdateSchema>
export type GenreOutput = z.infer<typeof genreSchema>
