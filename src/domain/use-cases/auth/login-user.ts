import { CreateTodoDto as CreateUserDto, LoginUserDto } from "../../dtos";
import { UserEntity } from "../../entities";
import { TodoEntity } from "../../entities/todo.entity";
import { AuthRepository } from "../../repositories/auth.repository";

export interface LoginUserUseCase {
    execute(dto: LoginUserDto): Promise<UserEntity>;
}

export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly repository: AuthRepository
    ){}

    execute(dto: LoginUserDto): Promise<UserEntity> {
        return this.repository.login(dto);
    }

}