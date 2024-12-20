import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AssistantService } from "../services/assistant.service";
import { NewAssistantDto } from "../dtos/newAssistant.dto";
import { InviteAssistantDto } from "../dtos/inviteAssistant.dto";

@Controller('assistant')
export class AssistantController {
    constructor(
        private AssistantService: AssistantService,
    ) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Add New Assistant
    @Post('createAssistant')
    async createNewAssistant(@Body() assistantDto: NewAssistantDto) {
        return await this.AssistantService.addNewAssistant(assistantDto);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get Single Assistant
    @Get('getAssistant/:assistantId')
    async getSingleAssistant(@Param('assistantId') assistantId: string) {
        return await this.AssistantService.findAssistant(assistantId);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get All Assistants
    @Get('getAssistants')
    async getAllAssistants() {
        return await this.AssistantService.findAllAssistants();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Update Single Assistant
    @Put('updateAssistant/:assistantId')
    async updateSingleAssistant(@Param('assistantId') assistantId: string) {
        
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Delete Single Assistant
    @Delete('deleteAssistant/:assistantId')
    async deleteSingleAssistant(@Param('assistantId') assistantId: string) {
        return await this.AssistantService.deleteAssistant(assistantId);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Invite New Assistant
    @Post('inviteAssistant')
    async inviteNewAssistant(@Body() assistantDto: InviteAssistantDto) {
        return await this.AssistantService.inviteNewAssistant(assistantDto);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Block Assistant
    @Get('blockAssistant/:assistantId')
    async blockAssistantAccount(@Param('assistantId') assistantId: string) {
        return await this.AssistantService.blockAssistant(assistantId)
    }
}