import { CreateTodoDto, UpdateTodoDto as DeleteTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface DeleteTodoUseCase {
    execute(id: number): Promise<TodoEntity>;
}

export class DeleteTodo implements DeleteTodoUseCase {

    constructor(
        private readonly repository: TodoRepository
    ){}

    execute(id: number): Promise<TodoEntity> {
        return this.repository.delete(id);
    }

}