import {CallHandler,ExecutionContext,Injectable,NestInterceptor} from '@nestjs/common';
import { tap } from 'rxjs';
import { Logger } from '../../domain/logger/logger';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: Logger) { }

    intercept(context: ExecutionContext, next: CallHandler) {
        const req = context.switchToHttp().getRequest();
        req._startTime = Date.now();

        return next.handle().pipe(
            tap((response) => {
                this.logger.info('HTTP Request', {
                    method: req.method,
                    url: req.url,
                    body: req.body,
                    response,
                    durationMs: Date.now() - req._startTime,
                });
            }),
        );
    }
}
