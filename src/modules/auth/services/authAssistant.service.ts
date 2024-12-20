import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "../dtos/login.dto";
import { CustomError } from "src/modules/shared/helpers/customError";
import { MailService } from "src/modules/shared/services/email.service";
import { JWTService } from "./jwt.service";
import { Assistant } from "src/modules/assistant/models/assistant.schema";
import { NewAssistantDto } from "src/modules/assistant/dtos/newAssistant.dto";
import { AssistantService } from "src/modules/assistant/services/assistant.service";

@Injectable()
export class AuthAssistantService {
    constructor(
        @InjectModel(Assistant.name)
        private AssistantModel: mongoose.Model<Assistant>,

        private JWTService: JWTService,

        private AssistantService: AssistantService
    ) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async login(loginDto: LoginDto) {
        const { email, password, conditionsAndPolicy } = loginDto;
        const loginEmail = email.toLowerCase();

        if(typeof conditionsAndPolicy !== 'boolean' || !conditionsAndPolicy) {
            throw new CustomError(400, 'You must agree to the terms and policies to login.');
        }

        const user = await this.AssistantModel.findOne({ email: loginEmail });
        if(!user) {
            throw new CustomError(400, 'Wrong credentials.');
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if(!passwordMatch) {
            throw new CustomError(400, 'Wrong credentials.');
        }

        if(!user.emailVerified) {
            throw new CustomError(400, 'Your account is not verified. Please wait till your account verify.');
        }

        const accessToken = await this.JWTService.generateAccessToken({ userId: user._id, userRole: user.role });

        return {
            message: 'Login Successfully.',
            token: accessToken
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async register(assistantDto: NewAssistantDto) {
        return await this.AssistantService.addNewAssistant(assistantDto);
    }
}