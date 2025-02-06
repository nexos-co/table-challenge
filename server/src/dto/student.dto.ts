import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    grade: string;

    @IsNotEmpty()
    @IsString()
    age: string;
}

export class UpdateUserDto {

    @IsEmail()
    email?: string;

    @IsString()
    age?: string;

    @IsString()
    grade?: string;


    @IsString()
    fullName?: string;
}


