import { CreateCategoryDto, PaginationDto, UpdateCategoryDto } from "../dtos";
import { CategoryEntity, UserEntity } from "../entities";

export abstract class CategoryDatasource {
    abstract create(createTodoDTO: CreateCategoryDto, user: UserEntity): Promise<CategoryEntity>;
    abstract getAll(paginationDto: PaginationDto): Promise<CategoryEntity[]>;
    abstract findById(id: number): Promise<CategoryEntity>;
    abstract update(updateTodoDTO: UpdateCategoryDto): Promise<CategoryEntity>;
    abstract delete(id: number): Promise<CategoryEntity>;
}