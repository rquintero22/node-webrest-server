import { CustomError } from "../errors/custom.error";

export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public role: string[],
        public img?: string,
    ) {}

    static fromJson(object: {[key: string]: any } ) {
        const {id, name, email, emailValidated, password, role, img} = object;

        if(!id ) {
            throw CustomError.badRequest('Missing id');
        } 
        
        if(!name ) {
            throw CustomError.badRequest('Missing name');
        } 
        
        if(!email ) {
            throw CustomError.badRequest('Missing email');
        } 
        
        if(emailValidated === undefined ) {
            throw CustomError.badRequest('Missing email validated');
        } 
        
        if(!password ) {
            throw CustomError.badRequest('Missing password');
        } 
        
        if(!role ) {
            throw CustomError.badRequest('Missing role');
        } 

        return new UserEntity(id, name, email, emailValidated, password, role, img);
    }
}