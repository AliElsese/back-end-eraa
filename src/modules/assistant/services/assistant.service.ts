import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Assistant } from "../models/assistant.schema";
import mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
import { CustomError } from "src/modules/shared/helpers/customError";
import { MailService } from "src/modules/shared/services/email.service";
import { NewAssistantDto } from "../dtos/newAssistant.dto";
import { InviteAssistantDto } from "../dtos/inviteAssistant.dto";
import { Code } from "src/modules/shared/models/code.schema";
import { generateRandomString } from "src/modules/shared/helpers/codeGenerator";

@Injectable()
export class AssistantService {
    constructor(
        @InjectModel(Assistant.name)
        private AssistantModel: mongoose.Model<Assistant>,

        @InjectModel(Code.name)
        private CodeModel: mongoose.Model<Code>,

        private MailService: MailService
    ) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async addNewAssistant(assistantDto: NewAssistantDto) {
        const { name, email, gender, phone, role, invitationCode, password, confirmPassword } = assistantDto;
        const assistantEmail = email.toLowerCase();

        const codeCheck = await this.CodeModel.findOne({ invitationCode });
        if(!codeCheck) {
            throw new CustomError(400, 'This code already used.');
        }

        if(password !== confirmPassword) {
            throw new CustomError(400, 'Password and confirm password do not match.');
        }

        const existingAssistant = await this.AssistantModel.findOne({ email: assistantEmail });
        if(existingAssistant) {
            throw new CustomError(400, 'This email already exist.');
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const assistant = await this.AssistantModel.create({
            name, email: assistantEmail,
            gender, phone, role,
            passwordHash: hashedPassword,
            emailVerified: true
        });

        await this.CodeModel.findOneAndDelete({ invitationCode });

        return {
            message: 'New Assistant Added Successfully.',
            assistant
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async findAssistant(assistantId: string) {
        const assistant = await this.AssistantModel.findById( assistantId );

        if(!assistant) {
            throw new CustomError(404, 'Assistant Not Found.');
        }

        return {
            message: 'Assistant Data.',
            assistant
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async findAllAssistants() {
        const assistants = await this.AssistantModel.find({ });

        return {
            message: 'Assistants Data.',
            assistants
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async deleteAssistant(assistantId: string) {
        const assistant = await this.AssistantModel.findByIdAndDelete( assistantId );

        if(!assistant) {
            throw new CustomError(404, 'Assistant Not Found.');
        }

        return {
            message: 'Assistant Deleted Successfully.'
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async inviteNewAssistant(assistantDto: InviteAssistantDto) {
        const assistantEmail = assistantDto.email.toLowerCase();

        const invitationCodeCheck = await this.CodeModel.findOne({ invitationCode: generateRandomString() });
        if(invitationCodeCheck) {
            throw new CustomError(400, 'Ask for new invitation code.');
        }

        const invitationCode = generateRandomString();

        await this.MailService.sendInvitationCode(assistantEmail, invitationCode);

        return {
            message: 'Invitation Code Send Successfully.'
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async blockAssistant(assistantId: string) {
        const assistant = await this.AssistantModel.findByIdAndUpdate( assistantId, {
            emailVerified: false
        });

        if(!assistant) {
            throw new CustomError(404, 'Assistant Not Found.');
        }

        return {
            message: 'Assistant Blocked Successfully.'
        }
    }
}