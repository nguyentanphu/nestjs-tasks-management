import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dtos/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) {

  }

  async createUser(credential: AuthCredentialDto) {
    const {username, password} = credential;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = this.userRepository.create({username, hashedPassword});
    await this.userRepository.save(newUser);
  }

  async signIn(credential: AuthCredentialDto): Promise<{accessToken: string}> {
    const {username, password} = credential;
    const user = await this.userRepository.findOne({username});
    if (!user) {
      throw new HttpException('Please check your credential.', HttpStatus.BAD_REQUEST);
    }
    const passwordMatched = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatched) {
      throw new HttpException('Please check your credential.', HttpStatus.BAD_REQUEST);
    }

    return {accessToken: this.jwtService.sign({username})};
  }

  async userExist(username: string) {
    return await this.userRepository.count({username}) > 0;
  }
}
