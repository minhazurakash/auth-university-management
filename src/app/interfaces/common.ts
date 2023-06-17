import { IGenericErrorMessage } from './error.interfaces'

export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}

export type IpaginationProps = {
  page?: number
  limit?: number
  sortBy?: string
  shortOrder?: 'asc' | 'desc'
}

export type IGenericResponse<T> = {
  meta: {
    page?: number
    limit?: number
    total?: number
  }
  data: T
}
