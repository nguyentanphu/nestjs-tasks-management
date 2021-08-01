import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class AuthCredentialDto {
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  usernameOrEmail: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string;
}