import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from '../schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {

  }

  async createUser(createUserDto: CreateUserDto) {
    const {username, email, password} = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    await this.userModel.create({username, email, hashedPassword});
  }

  async userExist(username, email) {
    return await this.userModel.countDocuments({
      $or: [
        {username},
        {email}
      ]
    }).exec() > 0;
  }

  async findUserByUserNameOrEmail(usernameOrEmail: string) {
    const columnKey = this.isEmail(usernameOrEmail) ? 'email' : 'username';
    const query = {[columnKey]: usernameOrEmail};

    return (await this.userModel.findOne(query).exec()).toObject();
  }

  async updateTwoFactorAuthenticationSecret(user, secret: string) {
    const existingUser = await this.userModel.findOne({
      email: user.email
    }).exec();
    existingUser.twoFactorAuthenticationSecret = secret;
    await existingUser.save();
  }

  private isEmail(text: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(text).toLowerCase());
  }

}