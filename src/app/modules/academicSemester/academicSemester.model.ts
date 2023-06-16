import { model, Schema } from 'mongoose'
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface'
import { AcademicSemesterConstant } from './academicSemester.constant'

const AcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: AcademicSemesterConstant.title,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterConstant.code,
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterConstant.month,
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterConstant.month,
    },
  },
  {
    timestamps: true,
  }
)

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  AcademicSemesterSchema
)
