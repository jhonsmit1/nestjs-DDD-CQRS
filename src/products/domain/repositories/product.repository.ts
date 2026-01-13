import { Product } from "../entities/product.entity";


export abstract class ProductRepository {
    abstract save(product: Product): Promise<void>;
    abstract findById(id: string): Promise<Product | null>
};
