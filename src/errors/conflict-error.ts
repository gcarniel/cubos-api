import { AppError } from "./app-error.js";

export class ConflictError extends AppError {
  constructor(message: string = 'Conflito') {
    super(message, 409)
    this.name = 'ConflictError'
  }
}