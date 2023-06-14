import { RequestHandler } from 'express'
import { UserService } from './user.services'

const createUserController: RequestHandler = async (req, res, next) => {
  try {
    const newUser = await UserService.createUserService(req?.body)
    res.status(200).json({
      success: true,
      message: 'user created successful',
      data: newUser,
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = {
  createUserController,
}
