import { Injectable } from '@nestjs/common';
import { ErrorReporter, ErrorContext } from '../../domain/reporting/error-reporter';
import { DomainError } from '../../domain/errors/domain.error';
import { Logger } from '../../domain/logger/logger';

@Injectable()
export class HttpErrorReporter implements ErrorReporter {
    constructor(private readonly logger: Logger) { }

    validation(context: ErrorContext): void {
        this.logger.warn('Validation Error', {
            validationErrors: context.validationErrors,
            context,
        });
    }

    domain(error: DomainError, context: ErrorContext): void {
        this.logger.warn('Domain Error', {
            errorCode: error.errorCode,
            message: error.message,
            context,
        });
    }

    unhandled(error: Error, context: ErrorContext): void {
        this.logger.error('Unhandled Error', {
            name: error.name,
            message: error.message,
            stack: error.stack,
            context,
        });
    }
}

