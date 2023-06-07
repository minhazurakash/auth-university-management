import winston from 'winston'
import path from 'path'

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({
      filename: path.join(process.cwd(), 'Log', 'winston', 'success.log'),
      level: 'info',
    }),
    new winston.transports.Console(),
  ],
})
export const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({
      filename: path.join(process.cwd(), 'Log', 'winston', 'error.log'),
      level: 'error',
    }),
    new winston.transports.Console(),
  ],
})
