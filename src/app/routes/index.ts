import express from 'express'
import { UserRoutes } from '../modules/users/user.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemesterRoutes'
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route'

const router = express.Router()

const moduleRoutes = [
  { path: '/user', route: UserRoutes },
  { path: '/academic-semesters', route: AcademicSemesterRoutes },
  { path: '/academic-faculty', route: AcademicFacultyRoute },
  { path: '/academic-department', route: AcademicDepartmentRoute },
]

moduleRoutes.map(route => router.use(route.path, route.route))

export default router
