import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { CustomError } from "src/modules/shared/helpers/customError";
import { EducationClass } from "../models/class.schema";
import { NewEducationClassDto } from "../dtos/newClass.dto";

@Injectable()
export class EducationClassService {
    constructor(
        @InjectModel(EducationClass.name)
        private EducationClassModel: mongoose.Model<EducationClass>,
    ) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async addNewEducationClass(educationClassDto: NewEducationClassDto) {
        const { educationClass } = educationClassDto;

        const existingEducationClass = await this.EducationClassModel.findOne({ educationClass });
        if(existingEducationClass) {
            throw new CustomError(400, 'This education class already exist.');            
        }
        
        const newEducationClass = await this.EducationClassModel.create({
            educationClass
        });
        
        return {
            message: 'New Education Class Added Successfully.',
            newEducationClass
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async findEducationClass(educationClassId: string) {
        const educationClass = await this.EducationClassModel.findById( educationClassId );

        if(!educationClass) {
            throw new CustomError(404, 'Education Class Not Found.');
        }

        return {
            message: 'Education Class Data.',
            educationClass
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async findAllEducationClasses() {
        const educationClasses = await this.EducationClassModel.find({ });

        return {
            message: 'Education Classes Data.',
            educationClasses
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async deleteEducationClass(educationClassId: string) {
        const educationClass = await this.EducationClassModel.findByIdAndDelete( educationClassId );

        if(!educationClass) {
            throw new CustomError(404, 'Education Class Not Found.');
        }

        return {
            message: 'Education Class Deleted Successfully.'
        }
    }
}