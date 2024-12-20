import { IsAlpha, IsAlphanumeric, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Genders } from "src/modules/shared/enums/gender.enum";
import { AssistantRoles } from "../enums/assistant.enums";

export class NewAssistantDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @IsAlpha()
    name: string;

    // @IsString()
    // @IsOptional()
    // profileImageKey?: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email: string;

    @IsNotEmpty()
    @IsEnum(Genders)
    gender: Genders;

    @IsNotEmpty()
    @IsNumber()
    @MaxLength(11)
    @MinLength(11)
    phone: number;

    @IsNotEmpty()
    @IsEnum(AssistantRoles)
    role: AssistantRoles;

    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    @MinLength(5)
    @MaxLength(5)
    invitationCode: string;

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