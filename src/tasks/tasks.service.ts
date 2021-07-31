import { Injectable } from '@nestjs/common';
import { TaskDto, TaskFilterDto } from './dtos/tasks.dto';
import { Task, TaskStatus } from './tasks.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {

  }

  getAllTasks() {
    return this.tasksRepository.find();
  }

  async getFilteredTasks(filterDto: TaskFilterDto) {
    const {title, description, status} = filterDto;
    let query = this.tasksRepository.createQueryBuilder('task');
    if (title) {
      query = query.where('LOWER(task.title) like LOWER(:title)', {title: `%${title}%`})
    }
    if (description) {
      query = query.andWhere('LOWER(task.description) like LOWER(:description)', {description: `%${description}%`})
    }

    if (status) {
      query = query.andWhere('task.status = :status', {status})
    }

    return await query.getMany();
      
  }

  getTaskById(id: number) {
    return this.tasksRepository.findOne(id);
  }

  createTask(taskDto: TaskDto): Promise<Task> {
    const newTask = new Task(taskDto);
    return this.tasksRepository.save(newTask);
  }

  deleteTaskById(id: number) {
    return this.tasksRepository.delete({id});
  }

  async setTaskStatus(id:number, status: TaskStatus) {
    const currentTask = await this.getTaskById(id);
    if (!currentTask) {
      return;
    }

    currentTask.setStatus(status);
    await this.tasksRepository.save(currentTask);
  }
}
