import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dtos/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { IsEmail } from 'class-validator/types/decorator/string/IsEmail';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) {

  }

  async createUser(createUserDto: CreateUserDto) {
    const {username, email, password} = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = this.userRepository.create({username, email, hashedPassword});
    await this.userRepository.save(newUser);
  }

  async validateUser(credential: AuthCredentialDto): Promise<any> {
    const {usernameOrEmail, password} = credential;
    let query = this.userRepository.createQueryBuilder('user')
    if (this.isEmail(usernameOrEmail)) {
      query = query.where('user.email = :email', {email: usernameOrEmail})
    } else {
      query = query.where('user.username = :username', {username: usernameOrEmail})
    }
    const user = await query.getOne();
    if (user && await bcrypt.compare(password, user.hashedPassword)) {
      const {hashedPassword, ...result} = user;
      return result;
    }
    return null;
  }

  signIn(userPayload: Partial<User>) {
    const jwtPayload = {
      sub: userPayload.id,
      username: userPayload.username,
      email: userPayload.email
    };

    return {
      accessToken: this.jwtService.sign(jwtPayload)
    }
  }

  async userExist(username, email) {
    return await this.userRepository.count({
      where: [
        {username},
        {email}
      ]
    }) > 0
  }

  private isEmail(text: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(text).toLowerCase());
}
}
