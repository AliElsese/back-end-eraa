import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { EducationClassService } from "../services/class.service";
import { NewEducationClassDto } from "../dtos/newClass.dto";


@Controller('educationClass')
export class EducationClassController {
    constructor(
        private EducationClassService: EducationClassService,
    ) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Add New EducationClass
    @Post('createEducationClass')
    async createNewEducationClass(@Body() educationClassDto: NewEducationClassDto) {
        return await this.EducationClassService.addNewEducationClass(educationClassDto);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get Single EducationClass
    @Get('getEducationClass/:educationClassId')
    async getSingleEducationClass(@Param('educationClassId') educationClassId: string) {
        return await this.EducationClassService.findEducationClass(educationClassId);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get All EducationClasses
    @Get('getEducationClasses')
    async getAllEducationClasses() {
        return await this.EducationClassService.findAllEducationClasses();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Update Single EducationClass
    @Put('updateEducationClass/:educationClassId')
    async updateSingleEducationClass(@Param('educationClassId') educationClassId: string) {
        
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Delete Single EducationClass
    @Delete('deleteEducationClass/:educationClassId')
    async deleteSingleEducationClass(@Param('educationClassId') educationClassId: string) {
        return await this.EducationClassService.deleteEducationClass(educationClassId);
    }
}