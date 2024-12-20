import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Genders } from 'src/modules/shared/enums/gender.enum';

@Schema({
    timestamps: true
})

export class Teacher extends Document {
    @Prop({ required: [true, 'Teacher name is required'] })
    name: string;

    // @Prop({ default: '' })
    // profileImageKey?: string;
    
    @Prop({ required: [true, 'Teacher email is required'] })
    email: string;

    @Prop({ required: [true, 'Teacher gender is required'], enum: Genders })
    gender: Genders;

    @Prop({ required: [true, 'Phone number is required'] })
    phone: number;

    @Prop({ default: 'Teacher' })
    role: string;

    @Prop({ required: [true, 'Password is required'] })
    passwordHash: string;

    @Prop({ default: '' })
    passwordResetToken: string;

    @Prop({ default: Date.now() })
    passwordResetExpiresAt: Date;

    @Prop({ default: false })
    emailVerified: boolean;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);