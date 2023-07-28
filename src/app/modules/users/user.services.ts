import mongoose from 'mongoose'
import config from '../../../config'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generatedStudentId } from './user.utils'
import { Student } from '../student/student.model'
import ApiError from '../../../error/ApiError'
import httpStatus from 'http-status'

const createStudentService = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_student_pass as string
  }

  // set student role
  user.role = 'student'
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  )
  // generate student id and set for student
  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const id = await generatedStudentId(academicSemester as IAcademicSemester)
    user.id = id as string
    student.id = id

    const createdStudent = await Student.create([student], { session })
    if (!createdStudent?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    // set student id
    user.student = createdStudent[0]._id
    const createdUser = await User.create([user], { session })
    if (!createdUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User')
    }

    newUserAllData = createdUser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }
  return newUserAllData
}

export const UserService = {
  createStudentService,
}
