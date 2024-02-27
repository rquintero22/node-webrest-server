import { PaginationDto } from "../../dtos";
import { ProductEntity } from "../../entities";
import { ProductRepository } from "../../repositories";

export interface GetProductsUseCase {
    execute(paginationDto: PaginationDto): Promise<ProductEntity[]>;
}

export class GetProducts implements GetProductsUseCase {

    constructor(
        private readonly repository: ProductRepository
    ){}

    execute(paginationDto: PaginationDto): Promise<ProductEntity[]> {
        return this.repository.getAll(paginationDto);
    }

}