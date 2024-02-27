import { UpdateProductDto, UpdateTodoDto } from "../../dtos";
import { ProductEntity } from "../../entities";
import { ProductRepository } from "../../repositories";

export interface UpdateProductUseCase {
    execute(dto: UpdateTodoDto): Promise<ProductEntity>;
}

export class UpdateProduct implements UpdateProductUseCase {

    constructor(
        private readonly repository: ProductRepository
    ){}

    execute(dto: UpdateProductDto): Promise<ProductEntity> {
        return this.repository.update(dto);
    }

}