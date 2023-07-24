import { Model, Types } from 'mongoose'

type IGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
  address: string
}
type ILocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}
type IBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

export type IStudent = {
  id: string
  name: {
    firstName: string
    middleName: string
    lastName: string
  }
  dateOfBirth: string
  gender: string
  bloodGroup?: IBloodGroup
  email: string
  guardian: IGuardian
  localGuardian: ILocalGuardian
  profileImage?: string
  academicFaculty: Types.ObjectId
  academicDepartment: Types.ObjectId
  academicSemester: Types.ObjectId
}

export type StudentModel = Model<IStudent, Record<string, unknown>>
