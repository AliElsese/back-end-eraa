import { Module } from "@nestjs/common";
import { TeacherController } from "./controllers/teacher.controller";
import { TeacherService } from "./services/teacher.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TeacherSchema } from "./models/teacher.schema";
import { MailService } from "../shared/services/email.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Teacher', schema: TeacherSchema },
        ])
    ],
    controllers: [TeacherController],
    providers: [TeacherService, MailService]
})

export class TeacherModule {};