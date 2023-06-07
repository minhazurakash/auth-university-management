import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf } = format
import path from 'path'

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const currentTime = `${date.toDateString()}-${hour}-${minutes}`
  return `${currentTime} [${label}] ${level}: ${message}`
})

export const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'Mewww!' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({
      filename: path.join(process.cwd(), 'Log', 'winston', 'success.log'),
      level: 'info',
    }),
    new transports.Console(),
  ],
})
export const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'right meow!' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({
      filename: path.join(process.cwd(), 'Log', 'winston', 'error.log'),
      level: 'error',
    }),
    new transports.Console(),
  ],
})
