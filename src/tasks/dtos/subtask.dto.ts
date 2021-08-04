import { IsOptional, IsNotEmpty } from 'class-validator';
import { IsObjectId } from 'src/shared/validators/objectId.validator';

export class SubTaskDto {
  @IsObjectId()
  @IsOptional()
  @IsNotEmpty()
  _id: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;
}