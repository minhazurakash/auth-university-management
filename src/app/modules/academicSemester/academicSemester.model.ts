import { model, Schema } from 'mongoose'
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface'
import { AcademicSemesterConstant } from './academicSemester.constant'
import ApiError from '../../../error/ApiError'
import httpStatus from 'http-status'

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

AcademicSemesterSchema.pre('save', async function (next) {
  const isExsits = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })
  if (isExsits) {
    throw new ApiError(httpStatus.CONFLICT, 'same semester is already exsists')
  }
  next()
})

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  AcademicSemesterSchema
)
