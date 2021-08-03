import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';
import { Model } from 'mongoose';
import { TaskDto } from './dtos/tasks.dto';

@Injectable()
export class TasksRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {

  }

  createTask(taskDto: TaskDto, userId: string): Promise<Task> {
    return this.taskModel.create({user: {_id: userId}, ...taskDto});
  }
}