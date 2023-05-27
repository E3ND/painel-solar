import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Request, Res } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Response } from "express";
import * as jwt from 'jsonwebtoken'

import { PainelSchema } from "src/Schemas/painel.schema";
import { UserModel } from "src/models/user.model";
import { PainelModel } from "src/models/painel.model";

import { getToken } from "src/helpers/get-token";
import { calculationPainel } from "src/helpers/calculation-painel";

@Controller('/calculo')
export class PainelController {
    constructor(@InjectRepository(PainelModel) private model: Repository<PainelModel>,
        @InjectRepository(UserModel) private modelUser: Repository<UserModel>) {

    }

    //Criando calculo
    @Post()
    public async create(@Body() body: PainelSchema, @Req() req: Request,  @Res() res: Response): Promise<{ data: PainelModel }> {
        //Pegando o usuário pelo token validado
        const token = getToken(req)
        const decoded = jwt.verify(token, 'gkahj2oas12maxz')
        const id = decoded.id

        const user = await this.modelUser.findOne({ where: {id} })
        
        //peguei o usuário com o token pelo usermodel do construtor private
        if(!user) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }
        
        const calcTotal = await calculationPainel(body.potenciaTotal, body.potenciaPlaca, body.comprimento, body.largura)
        
        const data = {
            user: user,
            potenciaTotal: body.potenciaTotal,
            potenciaPlaca: calcTotal.potenciaPlaca,
            comprimento: calcTotal.comprimento,
            largura: calcTotal.largura,
            areaTotal: calcTotal.areaTotal,
            comprimentoTotal: calcTotal.comprimentoTotal,
            qtsPlacas: calcTotal.qtsPlaca,
            inversores: calcTotal.inversores,
        }
                
        try {
            const calcSave = await this.model.save(data)
            
            res.status(201).json({ 
                message: 'Cálculo efetuado com sucesso!', 
                Registro: calcSave.id,
            })
        } catch (error) {
            res.status(500).json({ message: 'houve um erro, tente novamente!' })
            console.log(error)
        }

        return
    }

    //pegando o calculo pelo id
    @Get('/:id')
    public async getOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request,  @Res() res: Response): Promise<{ data: PainelModel }> {
        //Pegando o usuário pelo token validado
        const token = getToken(req)
        const decoded = jwt.verify(token, 'gkahj2oas12maxz')
        const idUser = decoded.id 

        const calc = await this.model.findOne({ 
            where:{ 
                id 
            },
            relations: {
                user: true,
            },
            select: {
                user: {
                    id: true,
                }
            }
        })

        if(!calc) {
            res.status(422).json({ message: 'Cálculo não encontrado!' })
            return
        }

        if(idUser !== calc.user.id) {
            res.status(404).json({ message: 'Acesso negado!' })
            return 
        }
       
        res.status(200).json({ calc })
        return
    }

    @Delete('/:id')
    public async deleteOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request, @Res() res: Response): Promise<{ data: PainelModel }> {
        //Pegando o usuário pelo token validado
        const token = getToken(req)
        const decoded = jwt.verify(token, 'gkahj2oas12maxz')
        const idUser = decoded.id 
        
        const calc = await this.model.findOne({ 
            where:{ 
                id 
            },
            relations: {
                user: true,
            },
            select: {
                user: {
                    id: true,
                }
            }
        })

        if(!calc) {
            res.status(422).json({ message: 'Cálculo não encontrado!' })
            return
        }

        if(idUser !== calc.user.id) {
            res.status(404).json({ message: 'Acesso negado!' })
            return 
        }

        try {
            await this.model.delete(calc.id)

            res.status(200).json({ message: 'Cálculo deletado com sucesso!' })
        } catch (error) {
            res.status(500).json({ message: 'houve um erro, tente novamente!' })
            console.log(error)
        }

    }

    @Put('/:id')
    public async updateOne(@Param('id', ParseIntPipe) id: number, @Body() body: PainelSchema, @Req() req: Request, @Res() res: Response): Promise<{ data: PainelModel }> {
        //Pegando o usuário pelo token validado
        const token = getToken(req)
        const decoded = jwt.verify(token, 'gkahj2oas12maxz')
        const idUser = decoded.id 

        const calc = await this.model.findOne({ 
            where:{ 
                id 
            },
            relations: {
                user: true,
            },
            select: {
                user: {
                    id: true,
                }
            }
        })

        if(!calc) {
            res.status(422).json({ message: 'Cálculo não encontrado!' })
            return
        }

        if(idUser !== calc.user.id) {
            res.status(404).json({ message: 'Acesso negado!' })
            return 
        }

        try {
            await this.model.update({ id }, body)

            res.status(200).json({ message: 'Cálculo atualizado com sucesso!' })
        } catch (error) {
            res.status(500).json({ message: 'houve um erro, tente novamente!' })
            console.log(error)
        }
        
        return
    }

    // Todos os calculos
    @Get('/')
    public async getAll(@Req() req: Request, @Res() res: Response): Promise<{ data: PainelModel[] }> {
        const allPainels = await this.model.find({
            relations: {
                user: true,
            },
            select: {
                user: {
                    id: true
                }
            }
        })
        
        res.status(200).json({ allPainels })

        return
    }
}