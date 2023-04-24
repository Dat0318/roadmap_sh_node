import { createLogger, format, transports } from 'winston';

const { combine, printf, timestamp } = format;
const winstonFormat = printf(
  ({ level, message, timestamp, stack }) => `${timestamp} ${level}: ${stack || message}`
);

const logger = createLogger({
  level: process.env.ENV === 'dev' ? 'debug' : 'info',
  format: combine(
    timestamp(),
    winstonFormat,
    process.env.ENV === 'dev' ? format.colorize() : format.uncolorize()
  ),
  transports: [new transports.Console()],
});

export default logger;
