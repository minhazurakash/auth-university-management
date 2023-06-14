import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import { userRouter } from './app/modules/users/users.route'
import globalErrorHandler from './app/midleware/globalErrorHandler'

// use middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// api

app.use('/api/v1/user', userRouter)
app.get('/', (req: Request, res: Response) => {
  res.send('App is running')
})
app.use(globalErrorHandler)

export default app
