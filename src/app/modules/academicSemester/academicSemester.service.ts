import { SortOrder } from 'mongoose'
import ApiError from '../../../error/ApiError'
import { paginateHelper } from '../../helper/calculatePaginateHelper'
import { IGenericResponse, IpaginationProps } from '../../interfaces/common'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import httpStatus from 'http-status'

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'semester title and code not matching'
    )
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAcademicSemesters = async (
  pagination: IpaginationProps
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginateHelper.calculatePaginateHelper(pagination)

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const result = await AcademicSemester.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: result,
  }
}

export const academicSemesterService = {
  createAcademicSemester,
  getAcademicSemesters,
}
