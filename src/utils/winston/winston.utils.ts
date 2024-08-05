import { createLogger, format, transports } from 'winston'
import { LoggingWinston } from '@google-cloud/logging-winston'

import { formatTimestamp } from '../../utils/index.utils'


export const Winston = (module: string) => createLogger({
  format: format.combine(
    format.timestamp(),
    format.colorize({ all: true }),
    format.align(),
    format.printf(({ level, message, timestamp }) => {
      const formatedDate = formatTimestamp(timestamp)
      return `(${module}) - [${formatedDate}] ${level}: ${message}`
    })
  ),
  transports: [
    new transports.Console(),
    new LoggingWinston()
  ]
})
