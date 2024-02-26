import { CategoryEntity, CategoryRepository, CreateCategoryDto, PaginationDto, UpdateCategoryDto, UserEntity } from "../../domain";
import { CategoryDatasource } from "../../domain/datasources";

export class CategoryRepositoryImpl implements CategoryRepository {

    constructor(
        private readonly datasource: CategoryDatasource
    ){}

    create(createCategoryDTO: CreateCategoryDto, user: UserEntity): Promise<CategoryEntity> {
        return this.datasource.create(createCategoryDTO, user);
    }
    getAll(paginationDto: PaginationDto): Promise<CategoryEntity[]> {
        return this.datasource.getAll(paginationDto);
    }
    findById(id: number): Promise<CategoryEntity> {
        return this.datasource.findById(id);
    }
    update(updateCategoryDTO: UpdateCategoryDto): Promise<CategoryEntity> {
        return this.datasource.update(updateCategoryDTO);
    }
    delete(id: number): Promise<CategoryEntity> {
       return this.datasource.delete(id);
    }

}