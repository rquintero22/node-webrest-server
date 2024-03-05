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
exports.ProductDatasourceImpl = void 0;
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
class ProductDatasourceImpl {
    create(createProductDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield postgres_1.prisma.product.create({
                data: Object.assign({}, createProductDTO)
            });
            return domain_1.ProductEntity.fromJson(product);
        });
    }
    getAll(paginationDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit } = paginationDto;
            //const products = await prisma.product.findMany({ skip: (page -1) * limit, take: limit } );
            //const total = await prisma.product.count();
            const [total, products] = yield Promise.all([
                postgres_1.prisma.product.count(),
                postgres_1.prisma.product.findMany({ skip: (page - 1) * limit, take: limit,
                    include: { user: true, category: true } })
            ]);
            return {
                total,
                page,
                limit,
                next: `/api/products?page=${page + 1}&limit=${limit}`,
                prev: (page - 1 > 0) ? `/api/products?page=${page - 1}&limit=${limit}` : null,
                products: products.map(product => domain_1.ProductEntity.fromJson(product))
            };
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield postgres_1.prisma.product.findFirst({ where: { id } });
            if (!product) {
                throw domain_1.CustomError.notFound(`Product with id ${id} not found`);
            }
            return domain_1.ProductEntity.fromJson(product);
        });
    }
    update(updateProductDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.findById(updateProductDTO.id);
            const updatedProduct = yield postgres_1.prisma.product.update({
                where: { id: updateProductDTO.id },
                data: updateProductDTO.values
            });
            return domain_1.ProductEntity.fromJson(updatedProduct);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.findById(id);
            const deleted = yield postgres_1.prisma.product.delete({ where: { id } });
            return domain_1.ProductEntity.fromJson(deleted);
        });
    }
}
exports.ProductDatasourceImpl = ProductDatasourceImpl;
