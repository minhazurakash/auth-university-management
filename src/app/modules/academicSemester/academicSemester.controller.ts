import { RequestHandler } from 'express'
import { academicSemesterService } from './academicSemester.service'

const createAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const newSemester = await academicSemesterService.createAcademicSemester(
      req?.body
    )
    res.status(200).json({
      success: true,
      message: 'AcademicSemester created successful',
      data: newSemester,
    })
  } catch (error) {
    next(error)
  }
}

export const AcademicSemesterController = {
  createAcademicSemester,
}
