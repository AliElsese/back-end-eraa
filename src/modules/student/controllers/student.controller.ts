import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { StudentService } from "../services/student.service";
import { NewStudentDto } from "../dtos/newStudent.dto";


@Controller('student')
export class StudentController {
    constructor(
        private StudentService: StudentService,
    ) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Add New Student
    @Post('createStudent')
    async createNewStudent(@Body() studentDto: NewStudentDto) {
        return await this.StudentService.addNewStudent(studentDto);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get Single Student
    @Get('getStudent/:studentId')
    async getSingleStudent(@Param('studentId') studentId: string) {
        return await this.StudentService.findStudent(studentId);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get All Students
    @Get('getStudents')
    async getAllStudents() {
        return await this.StudentService.findAllStudents();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Update Single Student
    @Put('updateStudent/:studentId')
    async updateSingleStudent(@Param('studentId') studentId: string) {
        
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Delete Single Student
    @Delete('deleteStudent/:studentId')
    async deleteSingleStudent(@Param('studentId') studentId: string) {
        return await this.StudentService.deleteStudent(studentId);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Add Student To Group
    @Post('addStudentGroup')
    async addStudentGroup(@Body() studentId: string, groupId: string) {
        return await this.StudentService.addStudentGroup(studentId, groupId);
    }
}