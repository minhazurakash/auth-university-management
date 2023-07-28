import express from 'express'
// import { UserController } from './user.controller'
import validateRequest from '../../midleware/validateRequest'
import { AcademicFacultyController } from './academicFaculty.controller'
import { AcademicFacultyValidation } from './academicFaculty.validation'
import { ENUM_USER_ROLE } from '../../enums/user'
import auth from '../../midleware/auth'

const router = express.Router()

router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty)
router.get('/', AcademicFacultyController.getAcademicFacultys)
router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.createAcademicFaculty
)

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateFacultyZodSchema),
  AcademicFacultyController.updateAcademicFaculty
)

router.delete('/:id', AcademicFacultyController.deleteAcademicFaculty)

export const AcademicFacultyRoute = router
