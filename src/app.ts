import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import globalErrorHandler from './app/midleware/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemesterRoutes'

// use middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// api

app.use('/api/v1/user', UserRoutes)
app.use('/api/v1/academic-semesters', AcademicSemesterRoutes)
app.get('/', async (req: Request, res: Response) => {
  res.send('App running')
})
app.use(globalErrorHandler)

export default app
