import { JwtAdapter, bcryptAdapter } from "../../config";
import { prisma } from "../../data/postgres";
import { AuthDatasource, CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { UserEntity } from "../../domain/entities/user.entity";

export class AuthDatasourceImpl implements AuthDatasource {

    async login(loginUserDto: LoginUserDto): Promise<any> {
        const userDB = await prisma.user.findFirst({ where: { email: loginUserDto.email }});

        if (!userDB) throw CustomError.badRequest(`Email / password ${loginUserDto.email} not exist`);

        const validPassword = bcryptAdapter.compare(loginUserDto.password, userDB.password);

        if (!validPassword) throw CustomError.badRequest(`Email / password ${loginUserDto.email} not exist`);

        const {password, ...rest} = UserEntity.fromJson( userDB);
       
        return {user: rest, token: await this.generateToken({...rest, password})};
    }
    
    async register(registerUserDto: RegisterUserDto): Promise<any> {
       
        const existUser = await prisma.user.findFirst({ where: { email: registerUserDto.email }});

        if (existUser) throw CustomError.badRequest(`Email ${registerUserDto.email} already exist`);

        registerUserDto.password = bcryptAdapter.hash(registerUserDto.password);

        const user = await prisma.user.create({
                data: registerUserDto!
            });
      
        const {password, ...rest} = UserEntity.fromJson(user);
            return {user: rest, token: await this.generateToken({...rest, password})};
      
    }
    
    validateEmail(token: string): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }

    private  async generateToken(user: UserEntity) {
       
        const token = await JwtAdapter.generateToken({id: user.id});
      
        if (!token) throw CustomError.internalServer('Error while creating Jwt');

        return token;
    }
}