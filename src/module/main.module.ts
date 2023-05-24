import { Module } from "@nestjs/common"; 
import { TypeOrmModule } from "@nestjs/typeorm";
import { PainelController } from "src/controllers/painel.controller";
import { UserController } from "src/controllers/user.controller";
import { PainelModel } from "src/models/painel.model";
import { UserModel } from "src/models/user.model";

@Module({
    imports: [TypeOrmModule.forFeature([UserModel, PainelModel])],
    controllers: [UserController, PainelController],
})

export class mainModule {}