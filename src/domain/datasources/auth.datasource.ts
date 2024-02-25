import { LoginUserDto, RegisterUserDto } from "../dtos";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasource {
    abstract login(loginUserDto: LoginUserDto): Promise<any>;
    abstract register(registerUserDto: RegisterUserDto): Promise<any>;
    abstract validateEmail(token: string): Promise<any>;
}