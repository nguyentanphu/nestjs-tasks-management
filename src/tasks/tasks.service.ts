import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task, TaskStatus } from '../schemas/task.schema';
import { User } from '../schemas/user.schema';
import { TaskDto } from './dtos/task.dto';
import { TasksRepository } from './tasks.repository';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskFilterDto } from './dtos/task-filter.dto';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {

  }

  // getAllTasks() {
  //   return this.tasksRepository.find();
  // }

  getTasks(filterDto?: TaskFilterDto) {
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string) {
    return (await this.tasksRepository.getTaskById(id)).toObject();
  }

  createTask(taskDto: TaskDto, user: Partial<User>): Promise<Task> {
    return this.tasksRepository.createTask(taskDto, user._id);
  }

  deleteTaskById(id: string) {
    return this.tasksRepository.deleteTask(id);
  }

  async setTaskStatus(id: string, status: TaskStatus) {
    const currentTask = await this.tasksRepository.getTaskById(id);
    if (!currentTask) {
      throw new HttpException(`Task with id ${id} was not found`, HttpStatus.NOT_FOUND);
    }

    currentTask.setStatus(status);
    await currentTask.save();
  }

  async updateTaskFields(id: string, updateTaskDto: UpdateTaskDto) {
    const currentTask = await this.tasksRepository.getTaskById(id);
    if (!currentTask) {
      throw new HttpException(`Task with id ${id} was not found`, HttpStatus.NOT_FOUND);
    }

    Object.assign(currentTask, updateTaskDto);
    await currentTask.save();
  }
}
