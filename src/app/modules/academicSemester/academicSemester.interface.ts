import { Model } from 'mongoose'

type IMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type IAcademicSemester = {
  title: 'Autumn' | 'Summer' | 'Fall'
  year: string
  code: '01' | '02' | '03'
  startMonth: IMonth
  endMonth: IMonth
}

export type AcademicSemesterModel = Model<
  IAcademicSemester,
  Record<string, unknown>
>
