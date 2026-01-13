import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { DomainError } from '../../domain/errors/domain.error';
import { ErrorReporter } from 'src/shared/domain/reporting/error-reporter';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(private readonly reporter: ErrorReporter) { }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();

        const context = {
            method: req.method,
            url: req.url,
            body: req.body,
            headers: req.headers,
            validationErrors: undefined,
            timestamp: new Date(),
            durationMs: req._startTime ? Date.now() - req._startTime : undefined
        };

        //  VALIDATION ERROR
        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const response = exception.getResponse() as any;

            if (
                status === HttpStatus.BAD_REQUEST &&
                Array.isArray(response?.message)
            ) {
                this.reporter.validation({ ...context, validationErrors: response.message });

                return res.status(400).json({ message: 'Validation error' });
            }
        }

        //  DOMAIN ERROR
        if (exception instanceof DomainError) {
            this.reporter.domain(exception, context);

            return res.status(exception.statusCode).json({ message: 'Invalid argument', });
        }

        //  ERROR NO CONTROLADO
        this.reporter.unhandled(exception as Error, context);

        return res.status(500).json({ message: 'Internal server error' });
    }
}

