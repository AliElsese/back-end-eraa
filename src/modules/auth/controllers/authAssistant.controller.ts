import { Body, Controller, Post } from "@nestjs/common";
import { AuthAssistantService } from "../services/authAssistant.service";
import { LoginDto } from "../dtos/login.dto";
import { NewAssistantDto } from "src/modules/assistant/dtos/newAssistant.dto";

@Controller('auth/assistant')
export class AuthAssistantController {
    constructor(
        private AuthAssistantService: AuthAssistantService
    ) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Login Assistant
    @Post('login')
    async teacherLogin(@Body() loginDto: LoginDto) {
        return await this.AuthAssistantService.login(loginDto);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Register Assistant
    @Post('register')
    async registerTeacher(@Body() assistantDto: NewAssistantDto) {
        return await this.AuthAssistantService.register(assistantDto);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
}