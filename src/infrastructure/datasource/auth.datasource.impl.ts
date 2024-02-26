import { JwtAdapter, bcryptAdapter, envs } from "../../config";
import { prisma } from "../../data/postgres";
import { AuthDatasource, CustomError, LoginUserDto, MailRepository, RegisterUserDto, SendMail, SendMailOptions } from "../../domain";
import { UserEntity } from "../../domain/entities/user.entity";

export class AuthDatasourceImpl implements AuthDatasource {

    
    constructor(
        private readonly mailRepository: MailRepository
    ){}


    async login(loginUserDto: LoginUserDto): Promise<any> {
        const userDB = await prisma.user.findFirst({ where: { email: loginUserDto.email }});

        if (!userDB) throw CustomError.badRequest(`Email / password ${loginUserDto.email} not exist`);

        const validPassword = bcryptAdapter.compare(loginUserDto.password, userDB.password);

        if (!validPassword) throw CustomError.badRequest(`Email / password ${loginUserDto.email} not exist`);

        const {password, ...rest} = UserEntity.fromJson( userDB);
        const token = await this.generateToken({...rest, password});
       
        return {user: rest, token};
    }
    
    async register(registerUserDto: RegisterUserDto): Promise<any> {
       
        const existUser = await prisma.user.findFirst({ where: { email: registerUserDto.email }});

        if (existUser) throw CustomError.badRequest(`Email ${registerUserDto.email} already exist`);

        registerUserDto.password = bcryptAdapter.hash(registerUserDto.password);

        const user = await prisma.user.create({
                data: registerUserDto!
            });

        await this.sendEmailValidationLink(user.email);
      
        const {password, ...rest} = UserEntity.fromJson(user);
        const token = await this.generateToken({...rest, password});

        return {user: rest, token };
      
    }
    
    async validateEmail(token: string): Promise<boolean> {
        const payload = await JwtAdapter.validateToken(token);
        if (!payload) throw CustomError.unauthorized('Invalid token');

        const {email} = payload as {email: string};

        if (!email) throw CustomError.internalServer('Email not in token');

        const user = await prisma.user.findFirst({ where: { email}});
        if(!user) throw CustomError.internalServer('Email not exists');

        user.emailValidated = true;
        await prisma.user.update({
            where: { id: user.id },
            data: {emailValidated: true}
        });

        return true;
    }

    private  async generateToken(user: UserEntity) {
       
        const token = await JwtAdapter.generateToken({id: user.id});
      
        if (!token) throw CustomError.internalServer('Error while creating Jwt');

        return token;
    }

    private sendEmailValidationLink = async (email: string) => {
        const token = await JwtAdapter.generateToken({email});
        if(!token) throw CustomError.internalServer(`Error getting token`);

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
        const html = `
        <h1>Validate your email</h1>
        <p>Click on the following link to validate your email</p>
        <a href="${link}">Validate your email: ${email}</a>
        `;

        const options: SendMailOptions = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html
        }

        const isSet = await this.mailRepository.send(options);
        if(!isSet) throw CustomError.internalServer('Error sending email');
        return true;
    }
}