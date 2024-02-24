import { CreateTodoDto, UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodoUseCase {
    execute(id: Number): Promise<TodoEntity>;
}

export class GetTodo implements GetTodoUseCase {

    constructor(
        private readonly repository: TodoRepository
    ){}

    execute(id: number): Promise<TodoEntity> {
        return this.repository.findById(id);
    }

}