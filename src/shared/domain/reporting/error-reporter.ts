import { DomainError } from '../errors/domain.error';

export interface ErrorContext {
    method?: string;
    url?: string;
    body?: Record<string, any>;
    headers?: Record<string, any>;
    validationErrors?: string[];
    timestamp: Date;
    durationMs?: number;
}

export abstract class ErrorReporter {
  abstract validation(context: ErrorContext): void;
  abstract domain(error: DomainError, context: ErrorContext): void;
  abstract unhandled(error: Error, context: ErrorContext): void;
}