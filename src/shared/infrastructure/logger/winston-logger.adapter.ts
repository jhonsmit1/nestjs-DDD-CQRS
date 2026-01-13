import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { Logger } from '../../domain/logger/logger';

@Injectable()
export class WinstonLoggerAdapter implements Logger {
    private readonly logger: winston.Logger;

    constructor() {
        const isProd = process.env.NODE_ENV === 'production';

        const prettyFormat = winston.format.printf(
            ({ level, message, timestamp, meta, trace }) => {
                return `${timestamp} ${level}: ${message}${meta ? ` ${JSON.stringify(meta)}` : ''}${trace ? `\n${trace}` : ''}`;
            },
        );

        this.logger = winston.createLogger({
            level: 'info',
            format: isProd
                ? winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json(),
                )
                : winston.format.combine(
                    winston.format.colorize({ all: true }), // colores
                    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    prettyFormat,
                ),
            transports: [new winston.transports.Console()],
        });
    }

    info(message: string, meta?: unknown): void {
        this.logger.info(message, { meta });
    }

    warn(message: string, meta?: unknown): void {
        this.logger.warn(message, { meta });
    }

    error(message: string, meta?: unknown): void {
        this.logger.error(message, { meta });
    }
};
