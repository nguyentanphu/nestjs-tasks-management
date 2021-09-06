import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { schemaOptions } from './schema.option';

export type UserDocument = User & Document;

@Schema(schemaOptions)
export class User {
  _id: string;

  @Prop({ unique: true, required: true, minlength: 6, maxlength: 32 })
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  hashedPassword: string;

  @Prop()
  twoFactorAuthenticationSecret: string;

  @Prop({default: false})
  twoFactorAuthenticationEnabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
