"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRepositoryImpl = void 0;
class TodoRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    create(createTodoDTO) {
        return this.datasource.create(createTodoDTO);
    }
    getlAll() {
        return this.datasource.getlAll();
    }
    findById(id) {
        return this.datasource.findById(id);
    }
    update(updateTodoDTO) {
        return this.datasource.update(updateTodoDTO);
    }
    delete(id) {
        return this.datasource.delete(id);
    }
}
exports.TodoRepositoryImpl = TodoRepositoryImpl;
