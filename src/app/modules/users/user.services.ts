import config from '../../../config'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generatedStudentId } from './user.utils'

const createUserService = async (user: IUser): Promise<IUser | null> => {
  const semester: IAcademicSemester = {
    code: '01',
    year: '2025',
    title: 'Summer',
    startMonth: 'December',
    endMonth: 'April',
  }
  const id = await generatedStudentId(semester)
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
