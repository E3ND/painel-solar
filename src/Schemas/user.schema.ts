import { IsInt, IsString, MaxLength, IsEmail, MinLength, Min, IsPositive } from 'class-validator'

export class UserSchema {
    @IsString()
    @MaxLength(120)
    @MinLength(1)
    name: String;

    @IsString()
    @MaxLength(220)
    @IsEmail()
    email: String;

    @IsInt()
    @IsPositive()
    phone: number;

    @IsString()
    @MaxLength(200)
    @MinLength(4)
    password:String;
}