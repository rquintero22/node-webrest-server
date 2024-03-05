"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTodo = void 0;
class DeleteTodo {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.delete(id);
    }
}
exports.DeleteTodo = DeleteTodo;
