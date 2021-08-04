import { TaskDto } from './task.dto';
import { TaskStatus } from '../../schemas/task.schema';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { SubTaskDto } from './subtask.dto';
import { Type } from 'class-transformer';

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @ValidateNested({each: true})
  @Type(() => SubTaskDto)
  subTasks?: SubTaskDto[] = [];
  status?: TaskStatus;
}