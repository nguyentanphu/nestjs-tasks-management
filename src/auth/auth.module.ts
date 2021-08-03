import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtSecret } from './jwt-secret';
import { LocalStrategy } from './strategies/local.strategy';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    SharedModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: {
        expiresIn: 3600
      }
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserRepository
  ],
  controllers: [AuthController],
  exports: [
    PassportModule
  ]
})
export class AuthModule {}
