import { NextFunction, Request, Response } from 'express'
// tipa controlador de rotas
type ControllerOperation = (request: Request, response: Response) => Promise<void>
// cria função que valida callback no roteamento
export function adapt(controllerOperation: ControllerOperation) {
  // try/catch para rotemanto
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await controllerOperation(request, response)
    } catch (error) {
      next(error)
    }
  }
}
