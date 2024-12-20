import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
    timestamps: true
})

export class Admin extends Document {
    @Prop({ })
    firstName: string;

    @Prop({ })
    lastName: string;

    @Prop({ default: '' })
    profileImageKey?: string;
    
    @Prop({ })
    email: string;

    @Prop({ default: 'Admin' })
    role: string;

    @Prop({ required: [true, 'Password is required'] })
    passwordHash: string;

    @Prop({ default: '' })
    passwordResetToken: string;

    @Prop({ default: Date.now() })
    passwordResetExpiresAt: Date;

    // @Prop({ default: '' })
    // emailVerificationToken: string;

    // @Prop({ default: Date.now() })
    // emailVerificationExpiresAt: Date;

    // @Prop({ default: false })
    // emailVerified: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);