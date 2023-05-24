import { IsInt, IsNumber, MaxLength, Min } from "class-validator";

export class PainelSchema {
    @Min(1)
    @IsNumber()
    potenciaTotal: number;

    @Min(1)
    @IsNumber()
    potenciaPlaca: number;

    @Min(1)
    @IsNumber()
    comprimento: number

    @Min(1)
    @IsNumber()
    largura: number
}


    