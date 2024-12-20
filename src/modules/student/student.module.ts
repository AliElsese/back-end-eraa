import { Module } from "@nestjs/common";
import { StudentController } from "./controllers/student.controller";
import { StudentService } from "./services/student.service";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentSchema } from "./models/student.schema";
import { GroupSchema } from "../group/models/group.schema";
import { MailService } from "../shared/services/email.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Student', schema: StudentSchema },
            { name: 'Group', schema: GroupSchema }
        ])
    ],
    controllers: [StudentController],
    providers: [StudentService, MailService]
})

export class StudentModule {};