import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: 'supersecret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    } as StrategyOptions)
  }

  async validate(payload) {
    console.log(payload);
    return payload;
  }
}