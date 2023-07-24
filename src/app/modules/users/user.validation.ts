import { z } from 'zod'
import { bloodGroup, gender } from '../student/student.constant'

const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is required',
        }),
        middleName: z.string({}).optional(),
        lastName: z.string({
          required_error: 'Last Name is required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      gender: z.enum([...gender] as [string], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string], {
          required_error: 'Blood group is required',
        })
        .optional(),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'fatherOccupation name is required',
        }),
        fatherContactNo: z.string({
          required_error: 'fatherContactNo name is required',
        }),
        motherName: z.string({
          required_error: 'mother name is required',
        }),
        motherOccupation: z.string({
          required_error: 'motherOccupation name is required',
        }),
        motherContactNo: z.string({
          required_error: 'motherContactNo name is required',
        }),
        address: z.string({
          required_error: 'address  is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: ' name is required',
        }),
        occupation: z.string({
          required_error: 'Occupation is required',
        }),
        contactNo: z.string({
          required_error: 'ContactNo is required',
        }),
        address: z.string({
          required_error: 'address is required',
        }),
      }),
      profileImage: z
        .string({
          required_error: 'Image is required',
        })
        .optional(),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is required',
      }),
      academicSemester: z.string({
        required_error: 'Academic Semester is required',
      }),
    }),
  }),
})
//   await createStudentZodSchema.parseAsync(req)

export const UserValidation = {
  createStudentZodSchema,
}
