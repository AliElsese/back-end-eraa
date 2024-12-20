import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TeacherService } from "../services/teacher.service";
import { NewTeacherDto } from "../dtos/newTeacher.dto";

@Controller('teacher')
export class TeacherController {
    constructor(
        private TeacherService: TeacherService,
    ) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Add New Teacher
    @Post('createTeacher')
    async createNewTeacher(@Body() teacherDto: NewTeacherDto) {
        return await this.TeacherService.addNewTeacher(teacherDto);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get Single Teacher
    @Get('getTeacher/:teacherId')
    async getSingleTeacher(@Param('teacherId') teacherId: string) {
        return await this.TeacherService.findTeacher(teacherId);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get All Teacheres
    @Get('getTeacheres')
    async getAllTeacheres() {
        return await this.TeacherService.findAllTeacheres();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Update Single Teacher
    @Put('updateTeacher/:teacherId')
    async updateSingleTeacher(@Param('teacherId') teacherId: string) {
        
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Delete Single Teacher
    @Delete('deleteTeacher/:teacherId')
    async deleteSingleTeacher(@Param('teacherId') teacherId: string) {
        return await this.TeacherService.deleteTeacher(teacherId);
    }
}