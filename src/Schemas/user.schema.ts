import { IsInt, IsString, MaxLength, IsEmail, Min } from 'class-validator'

export class UserSchema {
    @IsString()
    @MaxLength(120)
    name: String;

    @IsString()
    @MaxLength(220)
    @IsEmail()
    email: String;

    @IsInt()
    phone: number;

    @IsString()
    @MaxLength(200)
    password:String;
}