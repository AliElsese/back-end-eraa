import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Admin } from "../../admin/models/admin.schema";
import mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { LoginDto } from "../dtos/login.dto";
import { CustomError } from "src/modules/shared/helpers/customError";
import { MailService } from "src/modules/shared/services/email.service";
import { JWTService } from "./jwt.service";

@Injectable()
export class AuthAdminService {
    constructor(
        @InjectModel(Admin.name)
        private AdminModel: mongoose.Model<Admin>,

        private JWTService: JWTService
    ) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async login(loginDto: LoginDto) {
        const { email, password, conditionsAndPolicy } = loginDto;
        const loginEmail = email.toLowerCase();

        if(typeof conditionsAndPolicy !== 'boolean' || !conditionsAndPolicy) {
            throw new CustomError(400, 'You must agree to the terms and policies to login.');
        }

        const user = await this.AdminModel.findOne({ email: loginEmail });
        if(!user) {
            throw new CustomError(400, 'Wrong credentials.');
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if(!passwordMatch) {
            throw new CustomError(400, 'Wrong credentials.');
        }

        // if(!user.emailVerified) {
        //     throw new CustomError(400, 'Your account is not verified. Please wait till your account verify.');
        // }

        const accessToken = await this.JWTService.generateAccessToken({ userId: user._id, userRole: user.role });

        return {
            message: 'Login Successfully.',
            token: accessToken
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
}