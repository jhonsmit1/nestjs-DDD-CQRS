import { ProductRepository } from "src/products/domain/repositories/product.repository";
import { CreateProductDto } from "../dto/create-product.dto";
import { Product } from "src/products/domain/entities/product.entity";
import { randomUUID } from 'crypto';
import { Price } from "src/products/domain/value-objects/price.vo";
import { Injectable } from "@nestjs/common";


@Injectable()
export class CreateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(dto: CreateProductDto) {
        const product = new Product(
            randomUUID(),
            dto.name,
            new Price(dto.price)
        )
        await this.productRepository.save(product);
        return product.getSnapshot();
    }

}