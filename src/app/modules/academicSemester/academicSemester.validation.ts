import { z } from 'zod'
import { AcademicSemesterConstant } from './academicSemester.constant'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(
      [...AcademicSemesterConstant.title] as [string, ...string[]],
      {
        required_error: 'title is required',
      }
    ),
    year: z.string({
      required_error: 'year is requiere',
    }),
    code: z.enum([...AcademicSemesterConstant.code] as [string, ...string[]], {
      required_error: 'code is require',
    }),
    startMonth: z.enum(
      [...AcademicSemesterConstant.month] as [string, ...string[]],

      {
        required_error: 'startMonth is require',
      }
    ),
    endMonth: z.enum(
      [...AcademicSemesterConstant.month] as [string, ...string[]],

      {
        required_error: 'endMonth is require',
      }
    ),
  }),
})

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...AcademicSemesterConstant.title] as [string, ...string[]], {
          required_error: 'title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'year is require',
        })
        .optional(),
      code: z
        .enum([...AcademicSemesterConstant.code] as [string, ...string[]], {
          required_error: 'code is require',
        })
        .optional(),
      startMonth: z
        .enum(
          [...AcademicSemesterConstant.month] as [string, ...string[]],

          {
            required_error: 'startMonth is require',
          }
        )
        .optional(),
      endMonth: z
        .enum(
          [...AcademicSemesterConstant.month] as [string, ...string[]],

          {
            required_error: 'endMonth is require',
          }
        )
        .optional(),
    }),
  })
  .refine(
    data =>
      (data?.body?.title && data?.body?.code) ||
      (!data?.body?.title && !data?.body?.code),
    {
      message: 'Either both title and code or neither',
    }
  )

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
}
