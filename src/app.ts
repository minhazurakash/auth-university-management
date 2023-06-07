import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import { userRouter } from './app/modules/users/users.route'

// use middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// api
app.use('/api/v1/user', userRouter)

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World!')
  next()
})

export default app
