import { Module } from "@nestjs/common";
import { AssistantController } from "./controllers/assistant.controller";
import { AssistantService } from "./services/assistant.service";
import { MongooseModule } from "@nestjs/mongoose";
import { AssistantSchema } from "./models/assistant.schema";
import { MailService } from "../shared/services/email.service";
import { CodeSchema } from "../shared/models/code.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Assistant', schema: AssistantSchema },
            { name: 'Code', schema: CodeSchema }
        ])
    ],
    controllers: [AssistantController],
    providers: [AssistantService, MailService]
})

export class AssistantModule {};