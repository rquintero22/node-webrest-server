import { prisma } from "../../data/postgres";

import { CreateTodoDto, CustomError, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";

export class TodoDatasourceImpl implements TodoDatasource {

    async create(createTodoDTO: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDTO!
        });
        return TodoEntity.fromJson(todo);
    }
    async getlAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();

        return todos.map(todo => TodoEntity.fromJson(todo));
    }
    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({ where: { id }});
        if (!todo) {
            throw CustomError.notFound(`Todo with id ${id} not found`);
        }
        return TodoEntity.fromJson(todo);
    }
    async update(updateTodoDTO: UpdateTodoDto): Promise<TodoEntity> {
        const todo = await this.findById(updateTodoDTO.id);

        const updatedTodo = await prisma.todo.update({
            where: { id: updateTodoDTO.id },
            data: updateTodoDTO!.values
        });

        return TodoEntity.fromJson(updatedTodo);
    }
    async delete(id: number): Promise<TodoEntity> {
        const todo = await this.findById(id);

        const deleted = await prisma.todo.delete({where: {id}});

        return TodoEntity.fromJson(deleted);
    }

}