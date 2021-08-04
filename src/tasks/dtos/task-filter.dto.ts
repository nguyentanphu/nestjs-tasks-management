import { IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { TaskStatus } from 'src/schemas/task.schema';

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