"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryDatasourceImpl = void 0;
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
class CategoryDatasourceImpl {
    create(createCategoryDTO, user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(createCategoryDTO);
            const category = yield postgres_1.prisma.category.create({
                data: Object.assign(Object.assign({}, createCategoryDTO), { userId: +user.id })
            });
            return domain_1.CategoryEntity.fromJson(category);
        });
    }
    getAll(paginationDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit } = paginationDto;
            //const categories = await prisma.category.findMany({ skip: (page -1) * limit, take: limit } );
            //const total = await prisma.category.count();
            const [total, categories] = yield Promise.all([
                postgres_1.prisma.category.count(),
                postgres_1.prisma.category.findMany({ skip: (page - 1) * limit, take: limit })
            ]);
            return {
                total,
                page,
                limit,
                next: `/api/categories?page=${page + 1}&limit=${limit}`,
                prev: (page - 1 > 0) ? `/api/categories?page=${page - 1}&limit=${limit}` : null,
                categories: categories.map(category => domain_1.CategoryEntity.fromJson(category))
            };
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield postgres_1.prisma.category.findFirst({ where: { id } });
            if (!category) {
                throw domain_1.CustomError.notFound(`Category with id ${id} not found`);
            }
            return domain_1.CategoryEntity.fromJson(category);
        });
    }
    update(updateCategoryDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.findById(updateCategoryDTO.id);
            const updatedCategory = yield postgres_1.prisma.category.update({
                where: { id: updateCategoryDTO.id },
                data: updateCategoryDTO.values
            });
            return domain_1.CategoryEntity.fromJson(updatedCategory);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.findById(id);
            const deleted = yield postgres_1.prisma.category.delete({ where: { id } });
            return domain_1.CategoryEntity.fromJson(deleted);
        });
    }
}
exports.CategoryDatasourceImpl = CategoryDatasourceImpl;
