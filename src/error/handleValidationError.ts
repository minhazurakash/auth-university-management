import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../app/interfaces/error.interfaces'
import { IGenericErrorResponse } from '../app/interfaces/common'

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors)?.map(
    (
      el: mongoose.Error.ValidatorError | mongoose.Error.CastError
    ): IGenericErrorMessage => {
      return {
        path: el?.path,
        message: el?.message,
      }
    }
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError
