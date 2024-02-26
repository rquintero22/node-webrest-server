import { UpdateCategoryDto, UpdateTodoDto } from "../../dtos";
import { CategoryEntity } from "../../entities";
import { CategoryRepository } from "../../repositories";

export interface UpdateCategoryUseCase {
    execute(dto: UpdateTodoDto): Promise<CategoryEntity>;
}

export class UpdateCategory implements UpdateCategoryUseCase {

    constructor(
        private readonly repository: CategoryRepository
    ){}

    execute(dto: UpdateCategoryDto): Promise<CategoryEntity> {
        return this.repository.update(dto);
    }

}