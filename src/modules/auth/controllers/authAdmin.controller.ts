import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AuthAdminService } from "../services/authAdmin.service";
import { LoginDto } from "../dtos/login.dto";

@Controller('auth/admin')
export class AuthAdminController {
    constructor(
        private AuthAdminService: AuthAdminService
    ) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Login Admin
    @Post('login')
    async adminLogin(@Body() loginDto: LoginDto) {
        return await this.AuthAdminService.login(loginDto);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Register Admin
    @Post('register')
    async registerAdmin() {
        
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
}