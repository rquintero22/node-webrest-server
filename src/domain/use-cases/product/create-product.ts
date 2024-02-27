
import { CreateCategoryDto, CreateProductDto } from "../../dtos";
import { CategoryEntity, ProductEntity, UserEntity } from "../../entities";
import { CategoryRepository, ProductRepository } from "../../repositories";

export interface CreateProductUseCase {
    execute(dto: CreateProductDto, user: UserEntity): Promise<ProductEntity>;
}

export class CreateProduct implements CreateProductUseCase {

    constructor(
        private readonly repository: ProductRepository
    ){}

    execute(dto: CreateProductDto): Promise<ProductEntity> {
        return this.repository.create(dto);
    }

}