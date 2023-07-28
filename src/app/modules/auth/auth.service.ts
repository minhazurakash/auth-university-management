import httpStatus from 'http-status'
import ApiError from '../../../error/ApiError'
import { User } from '../users/user.model'
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'
import { jwtHelpers } from '../../helper/jwtHelper'
import config from '../../../config'
import jwt from 'jsonwebtoken'

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload
  const user = new User()
  const isUserExist = await user.isUserExists(id)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist")
  }
  if (
    isUserExist?.password &&
    !(await user.isPasswordMatch(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is not correct')
  }
  //   create a token
  const { id: userId, role, needPasswordChange } = isUserExist
  const accessToken = jwtHelpers.createToken(
    { userId, role },

    'secret',
    config.jwt.jwt_secret_expire as string
  )
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    'secret',
    config.jwt.jwt_secret_refresh_expire as string
  )

  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  const user = new User()
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(token, 'secret')
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token')
  }
  const { userId } = verifiedToken
  const isUserExist = await user.isUserExists(userId)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    'secret',
    config.jwt.jwt_secret_expire as string
  )
  return {
    accessToken: newAccessToken,
  }
}

export const AuthService = {
  loginUser,
  refreshToken,
}
