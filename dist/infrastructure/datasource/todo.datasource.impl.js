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
exports.TodoDatasourceImpl = void 0;
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
class TodoDatasourceImpl {
    create(createTodoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield postgres_1.prisma.todo.create({
                data: createTodoDTO
            });
            return domain_1.TodoEntity.fromJson(todo);
        });
    }
    getlAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = yield postgres_1.prisma.todo.findMany();
            return todos.map(todo => domain_1.TodoEntity.fromJson(todo));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield postgres_1.prisma.todo.findFirst({ where: { id } });
            if (!todo) {
                throw domain_1.CustomError.notFound(`Todo with id ${id} not found`);
            }
            return domain_1.TodoEntity.fromJson(todo);
        });
    }
    update(updateTodoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.findById(updateTodoDTO.id);
            const updatedTodo = yield postgres_1.prisma.todo.update({
                where: { id: updateTodoDTO.id },
                data: updateTodoDTO.values
            });
            return domain_1.TodoEntity.fromJson(updatedTodo);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.findById(id);
            const deleted = yield postgres_1.prisma.todo.delete({ where: { id } });
            return domain_1.TodoEntity.fromJson(deleted);
        });
    }
}
exports.TodoDatasourceImpl = TodoDatasourceImpl;
