
import { CategoryEntity } from "../../entities";
import { CategoryRepository } from "../../repositories";

export interface GetCategoryUseCase {
    execute(id: Number): Promise<CategoryEntity>;
}

export class GetCategory implements GetCategoryUseCase {

    constructor(
        private readonly repository: CategoryRepository
    ){}

    execute(id: number): Promise<CategoryEntity> {
        return this.repository.findById(id);
    }

}