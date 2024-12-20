import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Teacher } from "../models/teacher.schema";
import mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
import { CustomError } from "src/modules/shared/helpers/customError";
import { MailService } from "src/modules/shared/services/email.service";
import { NewTeacherDto } from "../dtos/newTeacher.dto";

@Injectable()
export class TeacherService {
    constructor(
        @InjectModel(Teacher.name)
        private TeacherModel: mongoose.Model<Teacher>,

        private MailService: MailService
    ) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async addNewTeacher(teacherDto: NewTeacherDto) {
        const { name, email, gender, phone, password, confirmPassword } = teacherDto;
        const teacherEmail = email.toLowerCase();

        if(password !== confirmPassword) {
            throw new CustomError(400, 'Password and confirm password do not match.');
        }

        const existingTeacher = await this.TeacherModel.findOne({ email: teacherEmail });
        if(existingTeacher) {
            throw new CustomError(400, 'This email already exist.');
            // send message to the real owner for email that there is someone try his email
            // return {
            //     message: 'If the email is not in our records, try to login and wait our verification for you.'
            // }
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const teacher = await this.TeacherModel.create({
            name, email: teacherEmail,
            gender, phone,
            passwordHash: hashedPassword,
            emailVerified: true
        });

        return {
            message: 'New Teacher Added Successfully.',
            teacher
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async findTeacher(teacherId: string) {
        const teacher = await this.TeacherModel.findById( teacherId );

        if(!teacher) {
            throw new CustomError(404, 'Teacher Not Found.');
        }

        return {
            message: 'Teacher Data.',
            teacher
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async findAllTeacheres() {
        const teacheres = await this.TeacherModel.find({ });

        return {
            message: 'Teacheres Data.',
            teacheres
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async deleteTeacher(teacherId: string) {
        const teacher = await this.TeacherModel.findByIdAndDelete( teacherId );

        if(!teacher) {
            throw new CustomError(404, 'Teacher Not Found.');
        }

        return {
            message: 'Teacher Deleted Successfully.'
        }
    }
}