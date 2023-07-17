import { NextFunction, Request, Response } from 'express'
import { academicSemesterService } from './academicSemester.service'
import { catchAsync } from '../../../shared/catchAsync'
import { pick } from '../../../shared/pick'
import { paginationFields } from '../constants/pagination'
import { sendResponse } from '../../../shared/sendResponse'
import { IAcademicSemester } from './academicSemester.interface'
import httpStatus from 'http-status'

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newSemester = await academicSemesterService.createAcademicSemester(
      req?.body
    )
    res.status(200).json({
      success: true,
      message: 'AcademicSemester created successful',
      data: newSemester,
    })
    next()
  }
)
const getAcademicSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req?.query, ['searchTerm', 'title', 'code', 'year'])
    const paginationOptios = pick(req.query, paginationFields)
    const result = await academicSemesterService.getAcademicSemesters(
      filters,
      paginationOptios
    )

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'semester fetched successful',
      meta: result.meta,
      data: result.data,
    })
    next()
  }
)
const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await academicSemesterService.getSingleAcademicSemester(
      req.params.id
    )
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'single semester fetched successful',
      data: result,
    })
    next()
  }
)
const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updateData = req.body
    const result = await academicSemesterService.updateAcademicSemester(
      req.params.id,
      updateData
    )
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester update successful',
      data: result,
    })
    next()
  }
)

export const AcademicSemesterController = {
  createAcademicSemester,
  getAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
}
