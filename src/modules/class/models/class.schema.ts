import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EducationClasses } from '../enums/class.enums';

@Schema({
    timestamps: true
})

export class EducationClass extends Document {
    @Prop({ required: [true, 'Education class is required'], enum: EducationClasses })
    educationClass: EducationClasses;

    @Prop({ default: 0 })
    groupsNumber: number
}

export const EducationClassSchema = SchemaFactory.createForClass(EducationClass);