import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'usernameOrEmail',
    } as IStrategyOptions)
  }

  async validate(usernameOrEmail, password) {
    const user = await this.authService.validateUser({usernameOrEmail, password});
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}