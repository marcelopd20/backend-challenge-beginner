import { NextFunction, Request, Response } from 'express'
import ErrorDto from '~/dtos/erro-dto'
import HttpException from '~/exceptions/http-exception'
// cria middleware de erro
export function errorMiddleware(error: unknown, _: Request, response: Response, next: NextFunction): void {
  try {
    // testa se erro retornado é http
    if (error instanceof HttpException) {
      // cria mensagem de rro
      const errorDto: ErrorDto = {
        code: String(error.statusCode),
        message: error.message
      }
      // cria response contendo erro gerado
      response.status(error.statusCode).json(errorDto)
      return
    }
    // cria erro interno do servidor
    const errorDto: ErrorDto = {
      code: '500',
      message: Reflect.get(error as object, 'message') || 'Internal server Error'
    }
    response.status(500).json(errorDto)
  } catch (error) {
    next(error)
  }
}
