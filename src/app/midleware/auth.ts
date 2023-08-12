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
      verifiedUser = jwtHelpers.verifyToken(token, 'secret')
      req.user = verifiedUser
      if (
        requiredRoles.length > 0 &&
        !requiredRoles.includes(verifiedUser.role)
      ) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'You have not permission to access this route'
        )
      }
      next()
    } catch (error) {
      next(error)
    }
  }

export default auth
