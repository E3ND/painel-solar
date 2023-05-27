import * as jwt from 'jsonwebtoken'

//Criando o token de validação
export const createUserToken = async(user, req, res) => {
    let msg:string;
    const token = jwt.sign({
        id: user.id,
        name: user.name,
    }, 'gkahj2oas12maxz')

    if(req.name){
        msg = 'Cadastrado com sucesso!'
    } else {
        msg = 'Login efetuado com sucesso!'
    }

    res.status(200).json({
        message: msg,
        token,
        userId: user._id
    })
}
