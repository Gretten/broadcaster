import winston from 'winston';

export const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.simple(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
    ),
    transports: [
        new winston.transports.File({ filename: 'events.log' }),
    ],
});
