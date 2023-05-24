import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from "./user.model";

@Entity()
export class PainelModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserModel, (user) => user.id)
    user: UserModel

    @Column('float')
    potenciaTotal: number;

    @Column('float')
    potenciaPlaca: number;

    @Column('float')
    comprimento: number

    @Column('float')
    largura: number

    @Column('float')
    areaTotal: number

    @Column('float')
    comprimentoTotal: number

    @Column('float')
    qtsPlacas: number

    @Column('float')
    inversores: number
}