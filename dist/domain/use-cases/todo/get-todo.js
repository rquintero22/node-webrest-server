"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTodo = void 0;
class GetTodo {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.findById(id);
    }
}
exports.GetTodo = GetTodo;
