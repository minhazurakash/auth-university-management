import { NextFunction, Request, Response } from 'express'
import { createUserService } from './users.services'

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await createUserService(req?.body)
    res.status(200).json({
      success: true,
      message: 'user created successful',
      data: newUser,
    })
  } catch (error) {
    next(error)
  }
}
