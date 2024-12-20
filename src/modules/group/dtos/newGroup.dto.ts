import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class NewGroupDto {
    @IsNotEmpty()
    @IsNumber()
    groupCapacity: number;
    
    @IsNotEmpty()
    @IsString()
    groupTime: string;
    
    @IsNotEmpty()
    @IsArray()
    groupDays: string[];
    
    @IsNotEmpty()
    @IsMongoId()
    educationClassId: string;
}