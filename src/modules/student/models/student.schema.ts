import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Genders } from 'src/modules/shared/enums/gender.enum';

@Schema({
    timestamps: true
})

export class Student extends Document {
    @Prop({ required: [true, 'Student name is required'] })
    name: string;
    
    // @Prop({ default: '' })
    // profileImageKey?: string;
        
    @Prop({ required: [true, 'Student email is required'] })
    email: string;
    
    @Prop({ required: [true, 'Education class is required'], type: Types.ObjectId,  ref: 'EducationClass' })
    educationClassId: Types.ObjectId;

    @Prop({ type: Types.ObjectId,  ref: 'Group' })
    groupId?: Types.ObjectId;
    
    @Prop({ })
    address?: string;
    
    @Prop({ required: [true, 'Student gender is required'], enum: Genders })
    gender: Genders;
    
    @Prop({ required: [true, 'Phone number is required'] })
    phone: number;

    @Prop({ required: [true, 'Parent phone number is required'] })
    parentPhone: number;

    @Prop({ default: 'Student' })
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

export const StudentSchema = SchemaFactory.createForClass(Student);