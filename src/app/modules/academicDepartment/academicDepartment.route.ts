import express from 'express'
// import { UserController } from './user.controller'
import validateRequest from '../../midleware/validateRequest'
import { AcademicDepartmentController } from './academicDepartment.controller'
import { AcademicDepartmentValidation } from './academicDepartment.validation'

const router = express.Router()

router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment)
router.get('/', AcademicDepartmentController.getAcademicDepartments)
router.post(
  '/create-department',
  validateRequest(AcademicDepartmentValidation.createDepartmentZodSchema),
  AcademicDepartmentController.createAcademicDepartment
)

router.patch(
  '/:id',
  validateRequest(AcademicDepartmentValidation.updateDepartmentZodSchema),
  AcademicDepartmentController.updateAcademicDepartment
)

router.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment)

export const AcademicDepartmentRoute = router
