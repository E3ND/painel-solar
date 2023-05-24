import * as jwt from 'jsonwebtoken'
import { getToken } from '../helpers/get-token'
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

//Validando através do Middleware o token
@Injectable()
export class verifyToken implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if(!req.headers.authorization) {
        return res.status(401).json({ message: 'Acesso negado!' })
    }

    const token = getToken(req)
    
    if(!token) {
        return res.status(404).json({ message: 'Acesso negado!' })
    }

    try {
        jwt.verify(token, 'gkahj2oas12maxz')
        next()
    } catch (error) {
        return res.status(400).json({ message: 'Token inválido' })
    }
  }
}

// export const verifyToken = (req, res, next) => {
//     const token = getToken(req)

//     if(!token) {
//         return res.status(404).json({ message: 'Acesso negado!' })
//     }

//     try {
//         const verified = jwt.verify(token, 'gkahj2oas12maxz')
//         next()
//         return verified
//     } catch (error) {
//         return res.status(400).json({ message: 'Token inválido' })
//     }
// }