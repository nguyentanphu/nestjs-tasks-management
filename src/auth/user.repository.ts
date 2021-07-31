import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { AuthCredentialDto } from './dtos/auth-credential.dto';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {

}