import { CreateProductDto, PaginationDto, UpdateProductDto } from "../dtos";
import { ProductEntity, UserEntity } from "../entities";

export abstract class ProductRepository {
    abstract create(createProductDTO: CreateProductDto): Promise<ProductEntity>;
    abstract getAll(paginationDto: PaginationDto): Promise<ProductEntity[]>;
    abstract findById(id: number): Promise<ProductEntity>;
    abstract update(updateProductDTO: UpdateProductDto): Promise<ProductEntity>;
    abstract delete(id: number): Promise<ProductEntity>;
}