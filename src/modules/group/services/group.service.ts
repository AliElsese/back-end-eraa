import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Group } from "../models/group.schema";
import mongoose from "mongoose";
import { CustomError } from "src/modules/shared/helpers/customError";
import { NewGroupDto } from "../dtos/newGroup.dto";
import { EducationClass } from "src/modules/class/models/class.schema";

@Injectable()
export class GroupService {
    constructor(
        @InjectModel(Group.name)
        private GroupModel: mongoose.Model<Group>,

        @InjectModel(EducationClass.name)
        private EducationClassModel: mongoose.Model<EducationClass>,
    ) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async addNewGroup(GroupDto: NewGroupDto) {
        const { groupCapacity, groupDays, groupTime, educationClassId } = GroupDto;

        const educationClass = await this.EducationClassModel.findById( educationClassId );
        if(!educationClass) {
            throw new CustomError(404, 'This Education class not found.');
        }

        const existingGroup = await this.GroupModel.findOne({ groupDays: { $in: groupDays }, groupTime });
        if(existingGroup) {
            throw new CustomError(400, 'This Group already exist.');
        }

        const Group = await this.GroupModel.create({
            groupCapacity, groupDays, groupTime,
            educationClassId
        });

        educationClass.groupsNumber++;
        await educationClass.save();

        return {
            message: 'New Group Added Successfully.',
            Group
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async findGroup(groupId: string) {
        const group = await this.GroupModel.findById( groupId );

        if(!group) {
            throw new CustomError(404, 'Group Not Found.');
        }

        return {
            message: 'Group Data.',
            group
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async findClassGroups(classId: string) {
        const groups = await this.GroupModel.find({ educationClassId: classId });

        return {
            message: 'Groups Data.',
            groups
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async findAllGroups() {
        const groups = await this.GroupModel.find({ });

        return {
            message: 'Groups Data.',
            groups
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async deleteGroup(groupId: string) {
        const group = await this.GroupModel.findByIdAndDelete( groupId ).exec();
        if(!group) {
            throw new CustomError(404, 'Group Not Found.');
        }

        const educationClass = await this.EducationClassModel.findById( group.educationClassId );
        if(!educationClass) {
            throw new CustomError(404, 'This Education class not found.');
        }

        educationClass.groupsNumber--;
        await educationClass.save();

        return {
            message: 'Group Deleted Successfully.'
        }
    }
}