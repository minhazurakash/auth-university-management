/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model, Types } from 'mongoose'
import { IStudent } from '../student/student.interface'

export type IUser = {
  id: string
  role: string
  password: string
  student?: Types.ObjectId | IStudent
  faculty?: Types.ObjectId
  needPasswordChange?: boolean
  // faculty?:Types.ObjectId | IFaculty;
  admin?: Types.ObjectId
  // admin?:Types.ObjectId | IAdmin;
}

export type IUserMethods = {
  isUserExists(id: string): Promise<Partial<IUser> | null>
  isPasswordMatch(givenPassword: string, savePassword: string): Promise<boolean>
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>
