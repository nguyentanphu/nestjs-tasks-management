import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument, TaskStatus } from '../schemas/task.schema';
import { Model, Types } from 'mongoose';
import { TaskDto } from './dtos/task.dto';

@Injectable()
export class TasksRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {

  }

  async getTaskById(id: string) {
    return await this.taskModel.findById(id);
  }

  createTask(taskDto: TaskDto, userId: string): Promise<Task> {
    return this.taskModel.create({user: {_id: userId}, ...taskDto});
  }

  async updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    const task = await this.taskModel.findById(taskId);
    task.setStatus(newStatus);
    await task.save();
    console.log(task.toObject());
  }
}