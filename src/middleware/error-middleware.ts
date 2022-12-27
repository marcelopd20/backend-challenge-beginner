import { NextFunction, Request, Response } from 'express'
import ErrorDto from '~/dtos/erro-dto'
import HttpException from '~/exceptions/http-exception'
export function errorMiddleware(error: unknown, _: Request, response: Response, next: NextFunction): void {
  try {
    if (error instanceof HttpException) {
      const errorDto: ErrorDto = {
        code: String(error.statusCode),
        message: error.message
      }
      response.status(error.statusCode).json(errorDto)
      return
    }
    const errorDto: ErrorDto = {
      code: '500',
      message: Reflect.get(error as object, 'message') ?? 'Internal server Error'
    }
    response.status(500).json(errorDto)
  } catch (error) {
    next(error)
  }
}
