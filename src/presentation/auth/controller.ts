import { Request, Response } from 'express';
import { CustomError, AuthRepository, RegisterUserDto, RegisterUser, LoginUserDto, LoginUser, ValidateEmailAuth } from '../../domain';

export class AuthController {

    constructor(
        public readonly authRepository: AuthRepository
    ) {
    }

    private handleError = (res: Response, error: unknown) => {
        if(error instanceof CustomError) {
            res.status(error.statusCode).json({error: error.message});
            return;
        } 
        res.status(500).json({error: 'Internal server error - check logs'});
    }

    public login = (req: Request, res: Response) => {
        const [error, loginDto] = LoginUserDto.create(req.body);
        if (error) return this.handleError(res, error);

        new LoginUser(this.authRepository)
            .execute(loginDto!)
            .then(user => res.json(user))
            .catch(error => this.handleError(res, error));
    }
    public register = (req: Request, res: Response) => {
        const [error, registerDto] = RegisterUserDto.create(req.body);
        if (error) return this.handleError(res, error);

        new RegisterUser(this.authRepository)
        .execute(registerDto!)
        .then(user => res.status(201).json(user) )
        .catch(error => this.handleError(res, error));
    }
    public validateEmail = (req: Request, res: Response) => {
        const {token} = req.params;
        new ValidateEmailAuth(this.authRepository)
            .execute(token)
            .then(() => res.json('Email validated'))
            .catch(error => this.handleError(res, error));
    }
}