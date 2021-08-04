import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task, TaskStatus } from '../schemas/task.schema';
import { User } from '../schemas/user.schema';
import { TaskDto } from './dtos/task.dto';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {

  }

  // getAllTasks() {
  //   return this.tasksRepository.find();
  // }

  // async getFilteredTasks(filterDto: TaskFilterDto) {
  //   const {title, description, status} = filterDto;
  //   let query = this.tasksRepository.createQueryBuilder('task');
  //   if (title) {
  //     query = query.where('LOWER(task.title) like LOWER(:title)', {title: `%${title}%`})
  //   }
  //   if (description) {
  //     query = query.andWhere('LOWER(task.description) like LOWER(:description)', {description: `%${description}%`})
  //   }

  //   if (status) {
  //     query = query.andWhere('task.status = :status', {status})
  //   }

  //   return await query.getMany();
      
  // }

  async getTaskById(id: string) {
    return (await this.tasksRepository.getTaskById(id)).toObject();
  }

  createTask(taskDto: TaskDto, user: Partial<User>): Promise<Task> {
    return this.tasksRepository.createTask(taskDto, user._id);
  }

  // deleteTaskById(id: number) {
  //   return this.tasksRepository.delete({id});
  // }

  async setTaskStatus(id: string, status: TaskStatus) {
    const currentTask = await this.tasksRepository.getTaskById(id);
    if (!currentTask) {
      throw new HttpException(`Task with id ${id} was not found`, HttpStatus.NOT_FOUND);
    }

    currentTask.setStatus(status);
    await currentTask.save();
  }
}
