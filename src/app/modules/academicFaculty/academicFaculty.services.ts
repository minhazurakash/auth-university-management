import { SortOrder } from 'mongoose'
import { paginateHelper } from '../../helper/calculatePaginateHelper'
import {
  IGenericResponse,
  ISearchOption,
  IpaginationProps,
} from '../../interfaces/common'
import { IAcademicFaculty } from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'

const createAcademicFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload)
  return result
}

const getAcademicFacultys = async (
  filters: ISearchOption,
  pagination: IpaginationProps
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters

  const searchAbleField = ['title']
  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: searchAbleField?.map(item => ({
        [item]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData)?.map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginateHelper.calculatePaginateHelper(pagination)

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereCondition = andCondition?.length > 0 ? { $and: andCondition } : {}
  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await AcademicFaculty.countDocuments()
  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: result,
  }
}

const getSingleAcademicFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id)
  return result
}

const updateAcademicFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteAcademicFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id)
  return result
}

export const AcademicFacultyService = {
  createAcademicFaculty,
  getAcademicFacultys,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
}
