import { Matches, MaxLength, MinLength, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @MinLength(6)
  @MaxLength(32)
  @Matches(/^[a-zA-Z0-9\-]+$/, {message: 'Username can only contain alpha, digit and - characters.'})
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @MaxLength(32)
  @IsNotEmpty()
  password: string;
}