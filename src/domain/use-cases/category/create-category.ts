
import { CreateCategoryDto } from "../../dtos";
import { CategoryEntity, UserEntity } from "../../entities";
import { CategoryRepository } from "../../repositories";

export interface CreateCategoryUseCase {
    execute(dto: CreateCategoryDto, user: UserEntity): Promise<CategoryEntity>;
}

export class CreateCategory implements CreateCategoryUseCase {

    constructor(
        private readonly repository: CategoryRepository
    ){}

    execute(dto: CreateCategoryDto, user: UserEntity): Promise<CategoryEntity> {
        return this.repository.create(dto, user);
    }

}