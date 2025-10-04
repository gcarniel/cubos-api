import { AppError } from './app-error.js'

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Não autorizado') {
    super(message, 401)
    this.name = 'UnauthorizedError'
  }
}
