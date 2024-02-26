import { AuthDatasource, LoginUserDto, MailDatasource, MailRepository, RegisterUserDto, SendMailOptions, UserEntity } from "../../domain";

export class MailRepositoryImpl implements MailRepository {

    constructor(
        private readonly datasource: MailDatasource
    ){}
    send(options: SendMailOptions): Promise<boolean> {
        return this.datasource.send(options);
    }
   
}