import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/products/domain/entities/product.entity";
import { ProductRepository } from "src/products/domain/repositories/product.repository";
import { ProductOrmEntity } from "../orm/product.orm-entity";
import { Repository } from "typeorm";
import { Price } from "src/products/domain/value-objects/price.vo";



@Injectable()
export class ProductRepositoryImp implements ProductRepository {

    constructor(
        @InjectRepository(ProductOrmEntity)
        private readonly ormRepo: Repository<ProductOrmEntity>
    ) { }

    async save(product: Product): Promise<void> {
        const data = product.getSnapshot();

        await this.ormRepo.save({
            id: data.id,
            name: data.name,
            price: data.price,
            active: data.active
        })
    }


    async findById(id: string): Promise<Product | null> {
        const entity = await this.ormRepo.findOne({ where: { id } });
        if (!entity) return null;

        return new Product(
            entity.id,
            entity.name,
            new Price(entity.price),
            entity.active
        )
    }

}