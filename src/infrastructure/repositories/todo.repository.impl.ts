import { CreateTodoDto, TodoDatasource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {

    constructor(
        private readonly datasource: TodoDatasource
    ){}

    create(createTodoDTO: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create(createTodoDTO);
    }
    getlAll(): Promise<TodoEntity[]> {
        return this.datasource.getlAll();
    }
    findById(id: number): Promise<TodoEntity> {
        return this.datasource.findById(id);
    }
    update(updateTodoDTO: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.update(updateTodoDTO);
    }
    delete(id: number): Promise<TodoEntity> {
       return this.datasource.delete(id);
    }

}