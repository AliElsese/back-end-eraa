import { Module } from "@nestjs/common";
import { EducationClassController } from "./controllers/class.controller";
import { EducationClassService } from "./services/class.service";
import { MongooseModule } from "@nestjs/mongoose";
import { EducationClassSchema } from "./models/class.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'EducationClass', schema: EducationClassSchema },
        ])
    ],
    controllers: [EducationClassController],
    providers: [EducationClassService]
})

export class EducationClassModule {};