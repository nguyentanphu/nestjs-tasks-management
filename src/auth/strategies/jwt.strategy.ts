import { jwtSecret } from './../jwt-secret';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    } as StrategyOptions)
  }

  async validate(payload) {
    return payload;
  }
}