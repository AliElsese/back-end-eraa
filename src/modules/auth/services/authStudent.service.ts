import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "../dtos/login.dto";
import { CustomError } from "src/modules/shared/helpers/customError";
import { JWTService } from "./jwt.service";
import { Student } from "src/modules/Student/models/Student.schema";
import { NewStudentDto } from "src/modules/Student/dtos/newStudent.dto";
import { StudentService } from "src/modules/Student/services/Student.service";

@Injectable()
export class AuthStudentService {
    constructor(
        @InjectModel(Student.name)
        private StudentModel: mongoose.Model<Student>,

        private JWTService: JWTService,

        private StudentService: StudentService
    ) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async login(loginDto: LoginDto) {
        const { email, password, conditionsAndPolicy } = loginDto;
        const loginEmail = email.toLowerCase();

        if(typeof conditionsAndPolicy !== 'boolean' || !conditionsAndPolicy) {
            throw new CustomError(400, 'You must agree to the terms and policies to login.');
        }

        const user = await this.StudentModel.findOne({ email: loginEmail });
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

    async register(studentDto: NewStudentDto) {
        return await this.StudentService.addNewStudent(studentDto);
    }
}