import { AuthDatasource, AuthRepository, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly datasource: AuthDatasource
    ){}
    login(loginUserDto: LoginUserDto): Promise<any> {
        return this.datasource.login(loginUserDto);
    }
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.datasource.register(registerUserDto);
    }
    validateEmail(token: string): Promise<any> {
        return this.datasource.validateEmail(token);
    }

}