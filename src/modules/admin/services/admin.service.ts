import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Admin } from "../models/admin.schema";
import mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { AdminDto } from "../dtos/admin.dto";
import { CustomError } from "src/modules/shared/helpers/customError";
import { MailService } from "src/modules/shared/services/email.service";
import { Teacher } from "src/modules/teacher/models/teacher.schema";

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin.name)
        private AdminModel: mongoose.Model<Admin>,

        @InjectModel(Teacher.name)
        private TeacherModel: mongoose.Model<Teacher>,

        private MailService: MailService
    ) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async addNewAdmin(adminDto: AdminDto) {
        const { firstName, lastName, password, confirmPassword } = adminDto;
        const adminEmail = adminDto.email.toLowerCase();

        if(password !== confirmPassword) {
            throw new CustomError(400, 'Password and confirm password do not match.');
        }

        const existingUser = await this.AdminModel.findOne({ email: adminEmail });
        if(existingUser) {
            throw new CustomError(400, 'This email already exist.');
            // return {
            //     message: 'If the email is not in our records, you will receive an email to verify your account shortly.'
            // }
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        // const verificationToken = crypto.randomBytes(32).toString('hex');
        // const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

        // const tokenExpiresAt = new Date();
        // tokenExpiresAt.setHours(tokenExpiresAt.getHours() + 24);

        const admin = await this.AdminModel.create({
            firstName, lastName, email: adminEmail,
            passwordHash: hashedPassword,
            // emailVerificationToken: hashedToken,
            // emailVerificationExpiresAt: tokenExpiresAt,
            // emailVerified: false
        })

        // Send verification email with the plain token
        // await this.MailService.sendVerificationEmail(adminEmail, verificationToken, firstName, 'Admin');

        return {
            message: 'New Admin Added Successfully.'
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async verifyTeacher(teacherId: string) {
        const teacher = await this.TeacherModel.findByIdAndUpdate(teacherId, {
            emailVerified: true
        }).exec();

        if(!teacher) {
            throw new CustomError(404, 'This Teacher Not Found.')
        }

        return {
            message: 'Teacher Account Verified Successfully.'
        }
    }
}