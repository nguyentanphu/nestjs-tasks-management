import { TaskDto } from './task.dto';
import { TaskStatus } from '../../schemas/task.schema';

export class UpdateTaskDto {
  title?: string;
  description?: string;
  subTasks?: { description: string }[] = [];
  status?: TaskStatus;
}