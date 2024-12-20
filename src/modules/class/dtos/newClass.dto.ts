import { IsEnum, IsMongoId, IsNotEmpty } from "class-validator";
import { EducationClasses } from "../enums/class.enums";

export class NewEducationClassDto {
    @IsNotEmpty()
    @IsEnum(EducationClasses)
    educationClass: EducationClasses;
}