import { SendMailOptions } from "../../entities";
import { MailRepository } from "../../repositories";

export interface SendMailUseCase {
    execute(dto: SendMailOptions): Promise<boolean>;
}

export class SendMail implements SendMailUseCase {

    constructor(
        private readonly repository: MailRepository
    ){}

    execute(dto: SendMailOptions): Promise<boolean> {
        return this.repository.send(dto);
    }

}