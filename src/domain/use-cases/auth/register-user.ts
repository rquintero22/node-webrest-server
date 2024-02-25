import { RegisterUserDto } from "../../dtos";
import { UserEntity } from "../../entities";
import { AuthRepository } from "../../repositories/auth.repository";

export interface RegisterUserUseCase {
    execute(dto: RegisterUserDto): Promise<UserEntity>;
}

export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly repository: AuthRepository
    ){}

    execute(dto: RegisterUserDto): Promise<UserEntity> {
        return this.repository.register(dto);
    }

}