import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Genders } from 'src/modules/shared/enums/gender.enum';
import { AssistantRoles } from '../enums/assistant.enums';

@Schema({
    timestamps: true
})

export class Assistant extends Document {
    @Prop({ required: [true, 'Assistant name is required'] })
    name: string;

    // @Prop({ default: '' })
    // profileImageKey?: string;
    
    @Prop({ required: [true, 'Assistant email is required'] })
    email: string;

    @Prop({ required: [true, 'Assistant gender is required'], enum: Genders })
    gender: Genders;

    @Prop({ required: [true, 'Phone number is required'] })
    phone: number;

    @Prop({ required: [true, 'Assistant role is required'], enum: AssistantRoles })
    role: AssistantRoles;

    @Prop({ required: [true, 'Password is required'] })
    passwordHash: string;

    @Prop({ default: '' })
    passwordResetToken: string;

    @Prop({ default: Date.now() })
    passwordResetExpiresAt: Date;

    @Prop({ default: false })
    emailVerified: boolean;
}

export const AssistantSchema = SchemaFactory.createForClass(Assistant);