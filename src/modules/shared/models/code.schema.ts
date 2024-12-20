import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true
})

export class Code extends Document {
    @Prop({ })
    invitationCode: string;
}

export const CodeSchema = SchemaFactory.createForClass(Code);