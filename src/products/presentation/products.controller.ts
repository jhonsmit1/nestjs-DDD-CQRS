import { Body, Controller, Post } from "@nestjs/common";
import { CreateProductUseCase } from "../application/use-cases/create-product.use-case";
import { CreateProductDto } from "./dto/create-product.dto";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateProductCommand } from "../application/commands/handlers/create-product.handler";



// @Controller('products')
// export class ProductsController {
//     constructor(private readonly createProductUseCase: CreateProductUseCase) { }

//     @Post()
//     async create(@Body() body: CreateProductDto) {
//         return this.createProductUseCase.execute(body);
//     }
// }

@Controller('products')
export class ProductsController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    @Post()
    create(@Body() dto: CreateProductDto) {
        return this.commandBus.execute(
            new CreateProductCommand(dto.name, dto.price)
        )
    }
}