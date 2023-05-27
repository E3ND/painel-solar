import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Request, Res } from "@nestjs/common"
import { Equal, Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { Response } from 'express'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import { UserSchema } from "src/Schemas/user.schema"
import { UserModel } from "src/models/user.model"
import { LoginSchema } from "src/Schemas/login.schema"

// Helpers
import {createUserToken} from 'src/helpers/create-user-token'
import { getToken } from "src/helpers/get-token"

@Controller('/user')
export class UserController {
    constructor(@InjectRepository(UserModel) private model: Repository<UserModel>) {

    }
    
    // Criando usuário
    @Post('/create')
    public async create(@Body() body: UserSchema, @Res() res: Response): Promise<{ data: UserModel }> {
        const { email } = body
        
        //Verificando se emial já existe
        const user = await this.model.findOne({ where: {email: Equal(email)} });
        
        if(user) {
            res.status(422).json({ message: 'E-mail já cadastrado, utilize outro e-mail!' })
            return
        }

        //Criptografando senha
        const salt = await bcrypt.genSalt(12)
        body.password = await bcrypt.hash(body.password.toString(), salt)
        
        try {
            const userCreated = await this.model.save(body)

            await createUserToken(userCreated, body, res)

        } catch (error) {
            res.status(500).json({ message: 'houve um erro, tente novamente!' })
            console.log(error)
        }
    }

    // Logando usuário
    @Get('/login')
    public async login(@Body() body: LoginSchema, @Res() res: Response): Promise<{ data: UserModel }> {
        const { email } = body

        //Verificando se emial já existe
        const user = await this.model.findOne({ where: {email: Equal(email)} });
        
        if(!user) {
            res.status(422).json({ message: 'Não existe usuário cadastrado com este e-mail.' })
            return
        }

        //Validando a senha do usuário
        const checkPassword = await bcrypt.compare(body.password.toString(), user.password.toString())

        if(!checkPassword) {
            res.status(422).json({ message: 'Senha incorreta!'})
            return
         }
        
         createUserToken(user, body, res)
    }

    // Pegando um único usuário
    @Get('/:id')
    public async getOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<{ data: UserModel }> {
        const userId = await this.model.findOne({ 
            where: { 
                id ,
            },
            select: [
                'id',
                'name',
                'phone',
                'email',
            ]
        })

        if(!userId) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }

        res.status(200).json({ userId })
    }

    // Pegando todos os usuários
    @Get()
    public async getAll(@Res() res: Response): Promise<{ data: UserModel[] }> {
        const allUsers = await this.model.find()
        
        res.status(200).json({allUsers})
        return
    }

    // pegando o susuário pelo token
    @Post('/get-user')
    public async getUserByTokoen(@Body() body, @Req() req: Request, @Res() res: Response): Promise<{ data:  UserModel }> {
        const token = getToken(req)

        const decoded = jwt.verify(token, 'gkahj2oas12maxz')
        const id = decoded.id

        const currentUser = await this.model.findOne({ 
            where: {
                id
            },
            select: [
                'id',
                'name',
                'phone',
                'email',
            ]
        })

        if(!currentUser) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }

        res.status(200).send(currentUser)
        return
    }
}