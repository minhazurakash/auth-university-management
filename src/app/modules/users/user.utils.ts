import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

export const getLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined
}
export const generatedStudentId = async (
  academicSemester: IAcademicSemester
) => {
  const currentId =
    (await getLastStudentId()) || (0).toString().padStart(5, '0')
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementId = `${academicSemester?.year?.substring(2)}${
    academicSemester.code
  }${incrementId}`
  return incrementId.toString().padStart(5, '0')
}

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastFaculty?.id ? lastFaculty.id.substring(0) : undefined
}

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0')
  let incrementId = (parseInt(currentId) + 1).toString().padStart(0, '5')
  incrementId = `F-${incrementId}`
  return incrementId
}
