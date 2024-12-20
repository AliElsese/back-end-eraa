import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    timestamps: true
})

export class Group extends Document {
    @Prop({ required: [true, 'Group capacity is required'] })
    groupCapacity: number;

    @Prop({ required: [true, 'Group time is required'] })
    groupTime: string;

    @Prop({ required: [true, 'Group days is required'] })
    groupDays: string[];

    @Prop({ default: 0 })
    studentsNumber: number;

    @Prop({ required: [true, 'Education class is required'], type: Types.ObjectId,  ref: 'EducationClass' })
    educationClassId: Types.ObjectId;
}

export const GroupSchema = SchemaFactory.createForClass(Group);