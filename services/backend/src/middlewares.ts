import { Request, Response, NextFunction } from 'express'

import { NODE_ENV } from './config'
import { AppError } from './errors'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  let stack = null

  if (NODE_ENV === 'development' && (error instanceof AppError || error instanceof Error)) {
    stack = error.stack
  }

  let statusCode = 500
  let message = 'something went wrong'

  if (error instanceof AppError) {
    statusCode = error.statusCode
    message = error.message
  }

  if (stack) {
    res.status(statusCode).json({ message, stack })
  } else {
    res.status(statusCode).json({ message})
  }
}
