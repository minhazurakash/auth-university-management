import { Request, Response } from 'express'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { AuthService } from './auth.service'
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface'
import config from '../../../config'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const { refreshToken, ...result } = await AuthService.loginUser(loginData)

  const cookieOptions = {
    secure: config.node_env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)
  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successful',
    data: result,
  })
})
const refreshTokenUser = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const result = await AuthService.refreshToken(refreshToken)

  const cookieOptions = {
    secure: config.node_env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successful',
    data: result,
  })
})

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { ...passwordData } = req.body
  const user = req.user
  await AuthService.changePassword(user, passwordData)

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Change password successful',
  })
})

export const AuthController = {
  loginUser,
  refreshTokenUser,
  changePassword,
}
