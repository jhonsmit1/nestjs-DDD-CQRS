
import { Entity, Column, PrimaryColumn } from 'typeorm';


@Entity('products')
export class ProductOrmEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;


    @Column()
    price: number


    @Column()
    active: boolean
}