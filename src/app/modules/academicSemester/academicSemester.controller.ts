import { NextFunction, Request, Response } from 'express'
import { academicSemesterService } from './academicSemester.service'
import { catchAsync } from '../../../shared/catchAsync'

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

export const AcademicSemesterController = {
  createAcademicSemester,
}
