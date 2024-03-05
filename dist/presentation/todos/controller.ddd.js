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
exports.TodosController = void 0;
const dtos_1 = require("../../domain/dtos");
class TodosController {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
        this.getTodos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const todos = yield this.todoRepository.getlAll();
            return res.json(todos);
        });
        this.getTodoById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            try {
                const todo = yield this.todoRepository.findById(id);
                res.json(todo);
            }
            catch (error) {
                res.status(404).json({ error: `TODO with id ${id} not found` });
            }
        });
        this.createTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, createTodoDto] = dtos_1.CreateTodoDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const todo = yield this.todoRepository.create(createTodoDto);
            res.json(todo);
        });
        this.updateTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            const [error, updateTodoDto] = dtos_1.UpdateTodoDto.create(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            const updatedTodo = yield this.todoRepository.update(updateTodoDto);
            return res.json(updatedTodo);
        });
        this.deleteTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            const deletedTodo = yield this.todoRepository.delete(id);
            res.json(deletedTodo);
        });
    }
}
exports.TodosController = TodosController;
