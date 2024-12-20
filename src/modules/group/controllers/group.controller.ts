import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { GroupService } from "../services/group.service";
import { NewGroupDto } from "../dtos/newGroup.dto";


@Controller('group')
export class GroupController {
    constructor(
        private GroupService: GroupService
    ) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Add New Group
    @Post('createGroup')
    async createNewGroup(@Body() groupDto: NewGroupDto) {
        return await this.GroupService.addNewGroup(groupDto);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get Single Group
    @Get('getGroup/:groupId')
    async getSingleGroup(@Param('groupId') groupId: string) {
        return await this.GroupService.findGroup(groupId);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get All Class Groups
    @Get('getGroup/:classId')
    async getAllClassGroups(@Param('classId') classId: string) {
        return await this.GroupService.findClassGroups(classId);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get All Groups
    @Get('getGroups')
    async getAllGroups() {
        return await this.GroupService.findAllGroups();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Update Single Group
    @Put('updateGroup/:groupId')
    async updateSingleGroup(@Param('groupId') groupId: string) {
        
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Delete Single Group
    @Delete('deleteGroup/:groupId')
    async deleteSingleGroup(@Param('groupId') groupId: string) {
        return await this.GroupService.deleteGroup(groupId);
    }
}