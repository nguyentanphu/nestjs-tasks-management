import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || !Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`Id ${value} is not correct!`);
    }

    return value;
  }

}