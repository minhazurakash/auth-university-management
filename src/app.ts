import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import globalErrorHandler from './app/midleware/globalErrorHandler'
import Routes from './app/routes'
import httpStatus from 'http-status'
import cookieParser from 'cookie-parser'

// use middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// api

app.use('/api/v1/', Routes)

app.get('/', async (req: Request, res: Response) => {
  res.send('App running')
})
app.use(globalErrorHandler)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
    errorMessage: [{ path: req.originalUrl, message: 'Route not found' }],
  })
  next()
})

export default app
