import { NextFunction, Request, Response } from 'express'

type ControllerOperation = (request: Request, response: Response) => Promise<void>

export function adapt(controllerOperation: ControllerOperation) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await controllerOperation(request, response)
    } catch (error) {
      next(error)
    }
  }
}
