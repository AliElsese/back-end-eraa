import { Module } from "@nestjs/common";
import { AdminController } from "./controllers/admin.controller";
import { AdminService } from "./services/admin.service";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminSchema } from "./models/admin.schema";
import { MailService } from "../shared/services/email.service";
import { TeacherSchema } from "../teacher/models/teacher.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Admin', schema: AdminSchema },
            { name: 'Teacher', schema: TeacherSchema }
        ])
    ],
    controllers: [AdminController],
    providers: [AdminService, MailService]
})

export class AdminModule {};