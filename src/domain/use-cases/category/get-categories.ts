import { PaginationDto } from "../../dtos";
import { CategoryEntity } from "../../entities";
import { CategoryRepository } from "../../repositories";

export interface GetCategoriesUseCase {
    execute(paginationDto: PaginationDto): Promise<CategoryEntity[]>;
}

export class GetCategories implements GetCategoriesUseCase {

    constructor(
        private readonly repository: CategoryRepository
    ){}

    execute(paginationDto: PaginationDto): Promise<CategoryEntity[]> {
        return this.repository.getAll(paginationDto);
    }

}