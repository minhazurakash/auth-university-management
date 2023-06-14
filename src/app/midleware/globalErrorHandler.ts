import { IGenericErrorMessage } from '../interfaces/error.interfaces'
import config from '../../config'
import handleValidationError from '../../error/handleValidationError'
import ApiError from '../../error/ApiError'
import { ErrorRequestHandler } from 'express'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500
  let message = 'Somethingn went wrong'
  let errorMessage: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessage = simplifiedError?.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessage = error?.message ? [{ path: '', message: error?.message }] : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessage = error?.message ? [{ path: '', message: error?.message }] : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config?.node_env ? error?.stack : undefined,
  })
  next()
}

export default globalErrorHandler
