import { LoginUserDto, RegisterUserDto } from "../dtos";
import { UserEntity } from "../entities";

export abstract class AuthRepository {
    abstract login(loginUserDto: LoginUserDto): Promise<any>;
    abstract register(dto: RegisterUserDto): Promise<any>;
    abstract validateEmail(token: string): Promise<any>;
}