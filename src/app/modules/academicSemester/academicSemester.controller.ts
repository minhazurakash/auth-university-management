import { Request, Response } from 'express'
import { academicSemesterService } from './academicSemester.service'
import { catchAsync } from '../../../shared/catchAsync'
import { pick } from '../../../shared/pick'
import { paginationFields } from '../../constants/pagination'
import { sendResponse } from '../../../shared/sendResponse'
import { IAcademicSemester } from './academicSemester.interface'
import httpStatus from 'http-status'

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const newSemester = await academicSemesterService.createAcademicSemester(
      req?.body
    )
    res.status(200).json({
      success: true,
      message: 'AcademicSemester created successful',
      data: newSemester,
    })
  }
)
const getAcademicSemesters = catchAsync(async (req: Request, res: Response) => {
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
})
const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.getSingleAcademicSemester(
      req.params.id
    )
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'single semester fetched successful',
      data: result,
    })
  }
)
const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
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
  }
)

const deleteAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.deleteAcademicSemester(
      req.params.id
    )
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester delete successful',
      data: result,
    })
  }
)

export const AcademicSemesterController = {
  createAcademicSemester,
  getAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
}
