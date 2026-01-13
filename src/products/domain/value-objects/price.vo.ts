
import { InvalidArgumentError } from "src/shared/domain/errors/invalid-argument.error";

export class Price {
    constructor(private readonly amount: number) {
        if (amount <= 0) {
            throw new InvalidArgumentError('Price must be greater than zero');
        }
    }

    value() {
        return this.amount;
    }


}