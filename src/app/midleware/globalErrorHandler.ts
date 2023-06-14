import { NextFunction, Request, Response } from 'express'
import { IGenericErrorMessage } from '../interfaces/error.interfaces'
import config from '../../config'
import handleValidationError from '../../error/handleValidationError'
import { error } from 'winston'
import ApiError from '../../error/ApiError'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Somethingn went wrong'
  let errorMessage: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessage = simplifiedError?.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessage = error?.message ? [{ path: '', message: err?.meaagse }] : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessage = error?.message ? [{ path: '', message: err?.meaagse }] : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config?.node_env ? err?.stack : undefined,
  })
  next()
}

export default globalErrorHandler
