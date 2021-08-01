import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtSecret } from './jwt-secret';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: {
        expiresIn: 3600
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [
    // PassportModule,
    // JwtStrategy
  ]
})
export class AuthModule {}
