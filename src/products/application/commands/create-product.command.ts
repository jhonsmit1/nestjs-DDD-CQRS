import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateProductCommand } from "./handlers/create-product.handler";
import { ProductRepository } from "src/products/domain/repositories/product.repository";
import { Product } from "src/products/domain/entities/product.entity";
import { randomUUID } from "crypto";
import { Price } from "src/products/domain/value-objects/price.vo";


@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
    constructor(private readonly repository: ProductRepository) { }

    async execute(command: CreateProductCommand) {
        const product = new Product(
            randomUUID(),
            command.name,
            new Price(command.price)
        );

        await this.repository.save(product);
        return product.getSnapshot();
    }
}