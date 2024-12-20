import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AdminService } from "../services/admin.service";
import { AdminDto } from "../dtos/admin.dto";

@Controller('admin')
export class AdminController {
    constructor(
        private AdminService: AdminService
    ) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Add New Admin
    @Post('createAdmin')
    async createNewAdmin(@Body() adminDto: AdminDto) {
        return await this.AdminService.addNewAdmin(adminDto);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get Single Admin
    @Get('getAdmin/:adminId')
    async getSingleAdmin(@Param('adminId') adminId: string) {
        
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get All Admins
    @Get('getAdmins')
    async getAllAdmins() {
        
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Update Single Admin
    @Put('updateAdmin/:adminId')
    async updateSingleAdmin(@Param('adminId') adminId: string, @Body() adminDto: AdminDto) {
        
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Delete Single Admin
    @Delete('deleteAdmin/:adminId')
    async deleteSingleAdmin(@Param('adminId') adminId: string) {
        
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Verify Teacher Account
    @Post('verifyTeacher/:teacherId')
    async verifyTeacherAccount(@Param('teacherId') teacherId: string) {
        return await this.AdminService.verifyTeacher(teacherId);
    }
}