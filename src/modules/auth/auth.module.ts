import { Module } from "@nestjs/common";
import { AuthAdminController } from "./controllers/authAdmin.controller";
import { AuthAdminService } from "./services/authAdmin.service";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminSchema } from "../admin/models/admin.schema";
import { MailService } from "../shared/services/email.service";
import { JWTService } from "./services/jwt.service";
import { AuthTeacherService } from "./services/authTeacher.service";
import { AuthTeacherController } from "./controllers/authTeacher.controller";
import { TeacherSchema } from "../teacher/models/teacher.schema";
import { AssistantSchema } from "../assistant/models/assistant.schema";
import { AuthAssistantService } from "./services/authAssistant.service";
import { AuthAssistantController } from "./controllers/authAssistant.controller";
import { AssistantService } from "../assistant/services/assistant.service";
import { CodeSchema } from "../shared/models/code.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Admin', schema: AdminSchema },
            { name: 'Teacher', schema: TeacherSchema},
            { name: 'Assistant', schema: AssistantSchema },
            { name: 'Code', schema: CodeSchema}
        ])
    ],
    controllers: [AuthAdminController, AuthTeacherController, AuthAssistantController],
    providers: [AuthAdminService, AuthTeacherService, AuthAssistantService, AssistantService, MailService, JWTService]
})

export class AuthModule {};