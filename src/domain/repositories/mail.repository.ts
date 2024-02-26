import { SendMailOptions } from "../entities";

export abstract class MailRepository {
    abstract send(options: SendMailOptions): Promise<boolean>;
}