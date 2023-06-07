import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generatedUserId } from './users.utils'

export const createUserService = async (user: IUser): Promise<IUser | null> => {
  const id = await generatedUserId()
  user.id = id as string
  if (!user.password) {
    user.password = config.default_user_pass as string
  }
  if (!user) {
    throw new Error('Failed to create user')
  }
  const createdUser = User.create(user)
  return createdUser
}
