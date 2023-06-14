import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

let server: Server
const DBconnent = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('db connenct')
    app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(error)
  }
  process.on('unhandledRejection', error => {
    console.log('Unhandle rejecttion gracefully')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

DBconnent()

process.on('SIGTERM', () => {
  if (server) {
    server.close()
  }
})
