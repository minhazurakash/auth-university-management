import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generatedUserId } from './user.utils'

const createUserService = async (user: IUser): Promise<IUser | null> => {
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

export const UserService = {
  createUserService,
}
