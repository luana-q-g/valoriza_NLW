import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({email, password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);
        
        // verificar se email existe
        const user = await usersRepositories.findOne({
            email
        });

        if(!user){
            throw new Error("Email/Password incorrect!");
        }
        
        // verificar se senha esta correta
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Email/Password incorrect!");
        }

        //gerar token
        const token = sign(
        {
            email: user.email
        },
        "c6d77faa82052fc8a7ac12bd01fafb3a",
        {
            subject: user.id,
            expiresIn: '1d'
        });

        return token;
    }
}

export { AuthenticateUserService };