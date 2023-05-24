import { IsString, MaxLength, IsEmail, IsNotEmpty } from 'class-validator'

export class LoginSchema {
    @IsString()
    @MaxLength(220)
    @IsEmail()
    @IsNotEmpty()
    email: String;

    @IsString()
    @MaxLength(200)
    @IsNotEmpty()
    password:String;
}