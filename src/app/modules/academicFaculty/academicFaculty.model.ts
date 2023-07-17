import { model, Schema } from 'mongoose'
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface'

const AcademicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'academic-faculty',
  AcademicFacultySchema
)