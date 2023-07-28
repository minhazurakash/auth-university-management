import { NextFunction, Request, Response } from 'express'
import ApiError from '../../error/ApiError'
import httpStatus from 'http-status'
import { jwtHelpers } from '../helper/jwtHelper'

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }
      //   verify token
      let verifiedUser = null
      try {
        verifiedUser = jwtHelpers.verifyToken(token, 'secret')
      } catch (error) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token')
      }
    } catch (error) {
      next(error)
    }
  }

export default auth
