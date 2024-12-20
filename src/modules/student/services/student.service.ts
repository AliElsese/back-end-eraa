import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
import { CustomError } from "src/modules/shared/helpers/customError";
import { Student } from "../models/student.schema";
import { NewStudentDto } from "../dtos/newStudent.dto";
import { MailService } from "src/modules/shared/services/email.service";
import { Group } from "src/modules/group/models/group.schema";
import { Canvas } from "canvas";
import * as JsBarcode from "jsbarcode";
import path from "path";
import fs from "fs";

@Injectable()
export class StudentService {
    constructor(
        @InjectModel(Student.name)
        private StudentModel: mongoose.Model<Student>,

        @InjectModel(Group.name)
        private GroupModel: mongoose.Model<Group>,

        private MailService: MailService
    ) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async addNewStudent(studentDto: NewStudentDto) {
        const { name, email, educationClassId, gender, phone, parentPhone, password, confirmPassword } = studentDto;
        const studentEmail = email.toLowerCase();

        if(password !== confirmPassword) {
            throw new CustomError(400, 'Password and confirm password do not match.');
        }

        const existingStudent = await this.StudentModel.findOne({ email: studentEmail });
        if(existingStudent) {
            await this.MailService.sendRegistrationAttemptEmail(studentEmail);

            return {
                message: 'If the email is not in our records, try to login and wait our verification for you.'
            }
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        
        // const student = await this.StudentModel.create({
        //     name, email: studentEmail, educationClassId,
        //     gender, phone, parentPhone,
        //     passwordHash: hashedPassword
        // });

        const canvas = new Canvas(2, 65, "image");
        JsBarcode(canvas, name, {
            format: 'CODE128',
            lineColor: "#000",
            displayValue: true
        });
        
        const filePath = `./uploads/students/${name}.png`;
        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync(path.resolve(filePath), buffer)
        
        return {
            message: 'If the email is not in our records, try to login and wait our verification for you.'
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async findStudent(studentId: string) {
        const student = await this.StudentModel.findById( studentId );

        if(!student) {
            throw new CustomError(404, 'Student Not Found.');
        }

        return {
            message: 'Student Data.',
            student
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async findAllStudents() {
        const students = await this.StudentModel.find({ });

        return {
            message: 'Students Data.',
            students
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async deleteStudent(studentId: string) {
        const student = await this.StudentModel.findByIdAndDelete( studentId ).exec();
        if(!student) {
            throw new CustomError(404, 'Student Not Found.');
        }

        const group = await this.GroupModel.findById( student.groupId );
        if(!group) {
            throw new CustomError(404, 'This Group Not Found.');
        }

        group.studentsNumber--;
        await group.save();

        return {
            message: 'Student Deleted Successfully.'
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async addStudentGroup(studentId: string, groupId: string) {
        const group = await this.GroupModel.findById( groupId );
        if(!group) {
            throw new CustomError(404, 'This Group Not Found.');
        }

        const student = await this.StudentModel.findById( studentId );
        if(!student.groupId) {
            group.studentsNumber++;
            await group.save();

            return {
                message: 'Student Added To Group Successfully.'
            }
        }
        else {
            const oldGroup = await this.GroupModel.findById( student.groupId );
            if(!oldGroup) {
                throw new CustomError(404, 'This Group Not Found.');
            }

            oldGroup.studentsNumber--;
            await oldGroup.save();

            group.studentsNumber++;
            await group.save();

            return {
                message: 'Student Added To Group Successfully.'
            }
        }
    }
}