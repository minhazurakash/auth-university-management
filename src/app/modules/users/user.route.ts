import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../midleware/validateRequest'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  UserController.createStudentController
)

export const UserRoutes = router
