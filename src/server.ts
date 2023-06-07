import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger } from './shared/logger'

const DBconnent = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('db connenct')
    app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    logger.error(error)
  }
}

DBconnent()
