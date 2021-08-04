import { UpdateTaskDto } from './dtos/update-task.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument, TaskStatus } from '../schemas/task.schema';
import { Model, Types } from 'mongoose';
import { TaskDto } from './dtos/task.dto';
import { TaskFilterDto } from './dtos/task-filter.dto';

@Injectable()
export class TasksRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {

  }

  async getTaskById(id: string) {
    return await this.taskModel.findById(id).exec();
  }

  async getTasks(filter?: TaskFilterDto) {
    const { title, description, status } = filter;
    const query: Record<string, any> = {};
    if (title) {
      query.title = new RegExp(this.escapeRegex(title));
    }
    if (description) {
      query.description = new RegExp(this.escapeRegex(description));
    }
    if (status) {
      query.status = status;
    }

    return await this.taskModel.find(query).exec();
  }

  createTask(taskDto: TaskDto, userId: string): Promise<Task> {
    return this.taskModel.create({ user: { _id: userId }, ...taskDto });
  }

  async deleteTask(id: string) {
    return await this.taskModel.deleteOne({
      _id: id
    }).exec();
  }

  private escapeRegex(string: string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }
}