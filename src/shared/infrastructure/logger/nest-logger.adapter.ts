import { LoggerService } from '@nestjs/common';
import { Logger } from '../../domain/logger/logger';

export class NestLoggerAdapter implements LoggerService {
    constructor(private readonly logger: Logger) { }

    log(message: string, context?: string) {
        this.logger.info(message, { context });
    }

    error(message: string, trace?: string, context?: string) {
        this.logger.error(message, { trace, context });
    }

    warn(message: string, context?: string) {
        this.logger.warn(message, { context });
    }

    debug(message: string, context?: string) {
        this.logger.info(message, { context, level: 'debug' });
    }

    verbose(message: string, context?: string) {
        this.logger.info(message, { context, level: 'verbose' });
    }
}
