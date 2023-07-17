import express from 'express'
// import { UserController } from './user.controller'
import validateRequest from '../../midleware/validateRequest'
import { AcademicSemesterValidation } from './academicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controller'

const router = express.Router()

router.get('/:id', AcademicSemesterController.getSingleAcademicSemester)
router.get('/', AcademicSemesterController.getAcademicSemesters)
router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester
)

router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateAcademicSemester
)

router.delete('/:id', AcademicSemesterController.deleteAcademicSemester)

export const AcademicSemesterRoutes = router
