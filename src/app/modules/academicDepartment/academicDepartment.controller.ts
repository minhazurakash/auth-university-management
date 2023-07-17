import { Request, Response } from 'express'
import { catchAsync } from '../../../shared/catchAsync'
import { pick } from '../../../shared/pick'
import { paginationFields } from '../../constants/pagination'
import { sendResponse } from '../../../shared/sendResponse'
import { AcademicDepartmentService } from './academicDepartment.services'
import httpStatus from 'http-status'
import { IAcademicDepartment } from './academicDepartment.interface'

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const newDepartment =
      await AcademicDepartmentService.createAcademicDepartment(req?.body)
    res.status(200).json({
      success: true,
      message: 'AcademicDepartment created successful',
      data: newDepartment,
    })
  }
)
const getAcademicDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req?.query, ['searchTerm', 'title', 'code', 'year'])
    const paginationOptios = pick(req.query, paginationFields)
    const result = await AcademicDepartmentService.getAcademicDepartments(
      filters,
      paginationOptios
    )

    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Department fetched successful',
      meta: result.meta,
      data: result.data,
    })
  }
)
const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicDepartmentService.getSingleAcademicDepartment(
      req.params.id
    )
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'single Department fetched successful',
      data: result,
    })
  }
)
const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const updateData = req.body
    const result = await AcademicDepartmentService.updateAcademicDepartment(
      req.params.id,
      updateData
    )
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Department update successful',
      data: result,
    })
  }
)

const deleteAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicDepartmentService.deleteAcademicDepartment(
      req.params.id
    )
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department delete successful',
      data: result,
    })
  }
)

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
}
