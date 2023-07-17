import express from 'express'
import { UserRoutes } from '../modules/users/user.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemesterRoutes'
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route'

const router = express.Router()

const moduleRoutes = [
  { path: '/user', route: UserRoutes },
  { path: '/academic-semesters', route: AcademicSemesterRoutes },
  { path: '/academic-faculty', route: AcademicFacultyRoute },
]

moduleRoutes.map(route => router.use(route.path, route.route))

export default router
