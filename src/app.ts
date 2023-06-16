import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import globalErrorHandler from './app/midleware/globalErrorHandler'
import Routes from './app/routes'

// use middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// api

app.use('/api/v1/', Routes)

app.get('/', async (req: Request, res: Response) => {
  res.send('App running')
})
app.use(globalErrorHandler)

export default app
