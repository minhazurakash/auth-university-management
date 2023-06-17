import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.services'
import { catchAsync } from '../../../shared/catchAsync'

const createUserController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await UserService.createUserService(req?.body)
    res.status(200).json({
      success: true,
      message: 'user created successful',
      data: newUser,
    })
    next()
  }
)

export const UserController = {
  createUserController,
}
