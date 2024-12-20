import { Module } from "@nestjs/common";
import { GroupController } from "./controllers/group.controller";
import { GroupService } from "./services/group.service";
import { MongooseModule } from "@nestjs/mongoose";
import { GroupSchema } from "./models/group.schema";
import { EducationClass } from "../class/models/class.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Group', schema: GroupSchema },
            { name: 'EducationClass', schema: EducationClass }
        ])
    ],
    controllers: [GroupController],
    providers: [GroupService]
})

export class GroupModule {};