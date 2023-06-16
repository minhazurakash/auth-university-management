import express from 'express'
import { UserRoutes } from '../modules/users/user.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemesterRoutes'

const router = express.Router()

const moduleRoutes = [
  { path: '/user', route: UserRoutes },
  { path: '/academic-semesters', route: AcademicSemesterRoutes },
]

moduleRoutes.map(route => router.use(route.path, route.route))

export default router
