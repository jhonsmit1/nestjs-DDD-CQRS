import { Module } from '@nestjs/common';
import { Logger } from './domain/logger/logger';
import { WinstonLoggerAdapter } from './infrastructure/logger/winston-logger.adapter';
import { ErrorReporter } from './domain/reporting/error-reporter';
import { HttpErrorReporter } from './infrastructure/reporting/http-error-reporter';

@Module({
  providers: [
    {
      provide: Logger,
      useClass: WinstonLoggerAdapter,
    },
    {
      provide: ErrorReporter,
      useClass: HttpErrorReporter,
    },
  ],
  exports: [Logger, ErrorReporter],
})
export class SharedModule {}
