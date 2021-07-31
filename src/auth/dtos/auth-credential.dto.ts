import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class AuthCredentialDto {
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}