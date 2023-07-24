import { Request, Response } from 'express'
import { UserService } from './user.services'
import { catchAsync } from '../../../shared/catchAsync'

const createStudentController = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body
    const newStudent = await UserService.createStudentService(student, userData)
    res.status(200).json({
      success: true,
      message: 'Student created successful',
      data: newStudent,
    })
  }
)

export const UserController = {
  createStudentController,
}
