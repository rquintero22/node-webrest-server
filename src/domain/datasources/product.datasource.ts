import { CreateCategoryDto, PaginationDto, UpdateCategoryDto } from "../dtos";
import { CreateProductDto } from "../dtos/products/create-product.dto";
import { CategoryEntity, ProductEntity, UserEntity } from "../entities";

export abstract class ProductDatasource {
    abstract create(createProductDTO: CreateProductDto): Promise<ProductEntity>;
    abstract getAll(paginationDto: PaginationDto): Promise<ProductEntity[]>;
    abstract findById(id: number): Promise<ProductEntity>;
    abstract update(updateProductDTO: UpdateCategoryDto): Promise<ProductEntity>;
    abstract delete(id: number): Promise<ProductEntity>;
}