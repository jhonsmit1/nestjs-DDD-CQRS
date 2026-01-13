import { DomainError } from "./domain.error";


export class InvalidArgumentError extends DomainError {
    readonly statusCode = 400;
    readonly errorCode = 'INVALID_ARGUMENT';
    constructor(message: string) {
        super(message);
    }
}