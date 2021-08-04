import { ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';
import { Types } from 'mongoose';

export function IsObjectId(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      // constraints: [property],
      options: validationOptions ? validationOptions : {message: 'Id is not correct format!'},
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && Types.ObjectId.isValid(value);
        },
      },
    });
  };
}