import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { TaskStatus } from '../../schemas/task.schema';

export class TaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  subTasks: { description: string }[] = [];
}

export class TaskFilterDto {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}