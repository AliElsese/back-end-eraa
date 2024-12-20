import { IsAlpha, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AdminDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @IsAlpha()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @IsAlpha()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(50)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, { message: 'The password must contain at least 10 characters, including one uppercase letter, one lowercase letter, one number, and one special character.' })
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(50)
    confirmPassword: string;
}