import { IGenericErrorMessage } from './error.interfaces'

export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}
