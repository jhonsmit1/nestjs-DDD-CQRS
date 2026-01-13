import { Module } from "@nestjs/common";
import { ProductsController } from "./presentation/products.controller";
import { CreateProductUseCase } from "./application/use-cases/create-product.use-case";
import { ProductRepository } from "./domain/repositories/product.repository";
import { ProductRepositoryImp } from "./infrastructure/persistence/product.repository.impl";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductOrmEntity } from "./infrastructure/orm/product.orm-entity";
import { SharedModule } from "src/shared/shared.module";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateProductHandler } from "./application/commands/create-product.command";

const CommandHandlers = [CreateProductHandler];
const QueryHandlers = [CreateProductHandler];

@Module({
    imports: [SharedModule, TypeOrmModule.forFeature([ProductOrmEntity]), CqrsModule],
    controllers: [ProductsController],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers,
        CreateProductUseCase,
        {
            provide: ProductRepository,
            useClass: ProductRepositoryImp
        }
    ]
})

export class ProductsModule { }