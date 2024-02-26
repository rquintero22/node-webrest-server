import { SendMailOptions } from "../entities";

export abstract class MailDatasource {
    abstract send(options: SendMailOptions): Promise<boolean>;
}