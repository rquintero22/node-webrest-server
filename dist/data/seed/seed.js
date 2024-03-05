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
const postgres_1 = require("../postgres");
const data_1 = require("./data");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
}))();
const randomBetweenBAndX = (x) => {
    return Math.floor(Math.random() * 5);
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Promise.all([
            postgres_1.prisma.product.deleteMany(),
            postgres_1.prisma.category.deleteMany(),
            postgres_1.prisma.user.deleteMany(),
        ]);
        const usersInsert = yield postgres_1.prisma.user.createMany({ data: data_1.seedData.users });
        const users = yield postgres_1.prisma.user.findMany();
        const categoriesInsert = yield postgres_1.prisma.category.createMany({
            data: data_1.seedData.categories.map(category => {
                return Object.assign(Object.assign({}, category), { userId: users[0].id });
            })
        });
        const categories = yield postgres_1.prisma.category.findMany();
        const productsInsert = yield postgres_1.prisma.product.createMany({
            data: data_1.seedData.products.map(product => {
                return Object.assign(Object.assign({}, product), { userId: users[randomBetweenBAndX(data_1.seedData.users.length - 1)].id, categoryId: categories[randomBetweenBAndX(data_1.seedData.categories.length - 1)].id });
            })
        });
        console.log('SEEDED');
    });
}
