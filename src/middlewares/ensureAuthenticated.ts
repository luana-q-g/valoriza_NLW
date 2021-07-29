import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    // receber token
    const authToken = request.headers.authorization;

    // validar se token esta preenchido
    if(!authToken){
        return response.status(401).end();
    }

    // validar se token eh valido
    const [ , token] = authToken.split(" ");

    try {
        const { sub } = verify(token, "c6d77faa82052fc8a7ac12bd01fafb3a") as IPayload;

        // recuperar informacoes do usuario
        request.user_id = sub;

        return next();

    } catch (err) {
        return response.status(401).end();
    }
}