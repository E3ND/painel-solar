import * as jwt from 'jsonwebtoken'

import { UserModel } from "src/models/user.model"

//Identifica o usuário pelo token

export const getUserByToken = async (token, res, model) => {
    
    if(!token) {
        return res.status(401).json({ message: 'Acesso negado!' })
    }

    const decoded = jwt.verify(token, 'gkahj2oas12maxz')

    //const user = await model.findOne({ where: { id } }) 

   // return user
}