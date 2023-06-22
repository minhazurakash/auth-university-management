import express from 'express'
// import { UserController } from './user.controller'
import validateRequest from '../../midleware/validateRequest'
import { AcademicSemesterValidation } from './academicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controller'

const router = express.Router()

router.get(
  '/semesters/:id',
  AcademicSemesterController.getSingleAcademicSemester
)
router.get('/semesters', AcademicSemesterController.getAcademicSemesters)
router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester
)

export const AcademicSemesterRoutes = router
