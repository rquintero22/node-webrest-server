import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDatasource {
    abstract create(createTodoDTO: CreateTodoDto): Promise<TodoEntity>;
    abstract getlAll(): Promise<TodoEntity[]>;
    abstract findById(id: number): Promise<TodoEntity>;
    abstract update(updateTodoDTO: UpdateTodoDto): Promise<TodoEntity>;
    abstract delete(id: number): Promise<TodoEntity>;
}