
import { Price } from "../value-objects/price.vo";

export class Product {
    constructor(
        private readonly id: string,
        private name: string,
        private price: Price,
        private active: boolean = true,
    ) { }

    changePrice(newPrice: Price) {
        if (!this.active) {
            throw new Error('Inactive product cannot change price')
        }
        this.price = newPrice;
    }

    deactivate() {
        this.active = false
    }

    getSnapshot() {
        return {
            id: this.id,
            name: this.name,
            price: this.price.value(),
            active: this.active
        }
    }
}