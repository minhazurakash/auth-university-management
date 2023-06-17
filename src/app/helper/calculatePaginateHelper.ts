import { SortOrder } from 'mongoose'

type paginateOption = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
}
type paginateOptionResult = {
  page: number
  limit: number
  skip: number
  sortBy?: string
  sortOrder?: SortOrder
}
const calculatePaginateHelper = (
  options: paginateOption
): paginateOptionResult => {
  const page = Number(options.page || 1)
  const limit = Number(options.limit || 10)
  const skip = (page - 1) * limit
  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder || 'desc'
  return { skip, page, limit, sortBy, sortOrder }
}

export const paginateHelper = {
  calculatePaginateHelper,
}
