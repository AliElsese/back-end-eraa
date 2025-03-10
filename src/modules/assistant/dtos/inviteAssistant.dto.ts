import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class InviteAssistantDto {
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email: string;
}