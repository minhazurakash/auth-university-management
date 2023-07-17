import { Request, Response } from 'express'
import { catchAsync } from '../../../shared/catchAsync'
import { pick } from '../../../shared/pick'
import { paginationFields } from '../../constants/pagination'
import { sendResponse } from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { IAcademicFaculty } from './academicFaculty.interface'
import { AcademicFacultyService } from './academicFaculty.services'

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const newFaculty = await AcademicFacultyService.createAcademicFaculty(
      req?.body
    )
    res.status(200).json({
      success: true,
      message: 'AcademicFaculty created successful',
      data: newFaculty,
    })
  }
)
const getAcademicFacultys = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req?.query, ['searchTerm', 'title', 'code', 'year'])
  const paginationOptios = pick(req.query, paginationFields)
  const result = await AcademicFacultyService.getAcademicFacultys(
    filters,
    paginationOptios
  )

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty fetched successful',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.getSingleAcademicFaculty(
      req.params.id
    )
    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'single Faculty fetched successful',
      data: result,
    })
  }
)
const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const updateData = req.body
    const result = await AcademicFacultyService.updateAcademicFaculty(
      req.params.id,
      updateData
    )
    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty update successful',
      data: result,
    })
  }
)

const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.deleteAcademicFaculty(
      req.params.id
    )
    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty delete successful',
      data: result,
    })
  }
)

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAcademicFacultys,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
}
