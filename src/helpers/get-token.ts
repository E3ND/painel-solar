//Pega o token e seta ele
export const getToken = (req) => {
    const authHeader = req.headers.authorization

    const token = authHeader.split(' ')[1]

    return token
}