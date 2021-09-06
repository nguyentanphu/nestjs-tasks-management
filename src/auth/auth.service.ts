import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dtos/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from 'src/schemas/user.schema';
import { authenticator } from 'otplib';
import { Response } from 'express';
import { toFileStream } from 'qrcode';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) {

  }

  createUser(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }

  async validateUser(credential: AuthCredentialDto): Promise<any> {
    const { usernameOrEmail, password } = credential;
    
    const user = await this.userRepository.findUserByUserNameOrEmail(usernameOrEmail);
    if (user && await bcrypt.compare(password, user.hashedPassword)) {
      const { hashedPassword, ...result } = user;
      return result;
    }
    return null;
  }

  signIn(userPayload: Partial<User>) {
    const jwtPayload = {
      _id: userPayload._id,
      sub: userPayload._id,
      username: userPayload.username,
      email: userPayload.email
    } as Partial<User>;

    return {
      accessToken: this.jwtService.sign(jwtPayload)
    }
  }

  userExist(username, email) {
    return this.userRepository.userExist(username, email);
  }

  async generateTwoFactorAuthentication(user, response: Response) {
    const secret = authenticator.generateSecret();
    const otpAuthUrl = authenticator.keyuri(user.email, 'Tasks management app', secret);
    await this.userRepository.updateTwoFactorAuthenticationSecret(user, secret);

    return await toFileStream(response, otpAuthUrl);
  }

  
}
