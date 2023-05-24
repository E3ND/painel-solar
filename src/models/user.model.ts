import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PainelModel } from './painel.model';

@Entity()
export class UserModel {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => PainelModel, (painel) => painel.user)
    painels: PainelModel[]

    @Column({ length: 120 } )
    name: String;

    @Column({ length: 220 })
    email: String;

    @Column('int')
    phone: number;

    @Column()
    password:String;
}