import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { schemaOptions } from './schema.option';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Schema(schemaOptions)
export class SubTask {
  _id: string;

  @Prop({required: true})
  description: string;
}

const subTaskSchema = SchemaFactory.createForClass(SubTask);

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  _id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ enum: TaskStatus, default: TaskStatus.OPEN })
  status: TaskStatus;

  @Prop({type: [subTaskSchema], default: []})
  subTasks: SubTask[];

  @Prop({type: MongooseSchema.Types.ObjectId, ref: User.name})
  user: User;

  setStatus(status: TaskStatus) {
    this.status = status;
  }
}

export const TaskSchema = SchemaFactory.createForClass(Task);