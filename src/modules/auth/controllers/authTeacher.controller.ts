import { Body, Controller, Post } from "@nestjs/common";
import { AuthTeacherService } from "../services/authTeacher.service";
import { LoginDto } from "../dtos/login.dto";

@Controller('auth/teacher')
export class AuthTeacherController {
    constructor(
        private AuthTeacherService: AuthTeacherService
    ) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Login Teacher
    @Post('login')
    async teacherLogin(@Body() loginDto: LoginDto) {
        return await this.AuthTeacherService.login(loginDto);
    }
    
}