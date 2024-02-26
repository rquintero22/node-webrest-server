import { prisma } from "../../data/postgres";

import { CustomError, CategoryEntity, CreateCategoryDto, UpdateCategoryDto, UserEntity, PaginationDto } from "../../domain";
import { CategoryDatasource } from "../../domain/datasources";

export class CategoryDatasourceImpl implements CategoryDatasource {

    async create(createCategoryDTO: CreateCategoryDto, user: UserEntity): Promise<CategoryEntity> {
        console.log(createCategoryDTO);
        const category = await prisma.category.create({
            data: {...createCategoryDTO!, userId: +user.id}
        });
        return CategoryEntity.fromJson(category);
    }
    async getAll(paginationDto: PaginationDto): Promise<any> {
        const {page, limit} = paginationDto;
        //const categories = await prisma.category.findMany({ skip: (page -1) * limit, take: limit } );
        //const total = await prisma.category.count();

        const [total, categories] = await Promise.all([
            prisma.category.count(),
            prisma.category.findMany({ skip: (page -1) * limit, take: limit } )
        ]);

        return {
            total,
            page,
            limit,
            next: `/api/categories?page=${page+1}&limit=${limit}`,
            prev: (page -1 > 0) ? `/api/categories?page=${page-1}&limit=${limit}` : null,
            categories: categories.map(category => CategoryEntity.fromJson(category))
        };
    }
    async findById(id: number): Promise<CategoryEntity> {
        const category = await prisma.category.findFirst({ where: { id }});
        if (!category) {
            throw CustomError.notFound(`Category with id ${id} not found`);
        }
        return CategoryEntity.fromJson(category);
    }
    async update(updateCategoryDTO: UpdateCategoryDto): Promise<CategoryEntity> {
        const category = await this.findById(updateCategoryDTO.id);

        const updatedCategory = await prisma.category.update({
            where: { id: updateCategoryDTO.id },
            data: updateCategoryDTO!.values
        });

        return CategoryEntity.fromJson(updatedCategory);
    }
    async delete(id: number): Promise<CategoryEntity> {
        const category = await this.findById(id);

        const deleted = await prisma.category.delete({where: {id}});

        return CategoryEntity.fromJson(deleted);
    }

}