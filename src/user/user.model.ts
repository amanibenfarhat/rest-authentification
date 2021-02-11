import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from './roles/role.enum';


export type UserDocument = User & Document;

@Schema()
export class User {

  
  @Prop({ required: true,unique: true, index: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({default: Role.USER})
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);