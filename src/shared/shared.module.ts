import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema';
import { User } from '../schemas/user.schema';
import { UserSchema } from '../schemas/user.schema';
import { TaskSchema } from '../schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Task.name,
        schema: TaskSchema
      }
    ])
  ],
  exports: [
    MongooseModule
  ]
})
export class SharedModule {
  
}