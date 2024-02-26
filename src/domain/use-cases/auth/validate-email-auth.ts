
import { UserEntity } from "../../entities";
import { AuthRepository } from "../../repositories/auth.repository";

export interface ValidateEmailAuthUseCase {
    execute(token: string): Promise<boolean>;
}

export class ValidateEmailAuth implements ValidateEmailAuthUseCase {

    constructor(
        private readonly repository: AuthRepository
    ){}

    execute(token: string): Promise<boolean> {
        return this.repository.validateEmail(token);
    }

}