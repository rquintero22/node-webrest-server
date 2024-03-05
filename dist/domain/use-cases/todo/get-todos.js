"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTodos = void 0;
class GetTodos {
    constructor(repository) {
        this.repository = repository;
    }
    execute() {
        return this.repository.getlAll();
    }
}
exports.GetTodos = GetTodos;
