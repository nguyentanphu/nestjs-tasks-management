import { Body, Controller, Post, HttpException, HttpStatus, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthCredentialDto } from './dtos/auth-credential.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {

  }

  @Post('signUp')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const userExist = await this.authService.userExist(createUserDto.username, createUserDto.email);
    if (userExist) {
      throw new HttpException('username or email is taken.', HttpStatus.BAD_REQUEST);
    }

    await this.authService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  signIn(@Req() req, @Body() dto: AuthCredentialDto) {
    return this.authService.signIn(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('test')
  // test(@Req() req) {
  //   console.log(req.user);
  // }

  @Post('generate2fa')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async generateTwoFactor(@Req() req: Request, @Res() res) {
    return this.authService.generateTwoFactorAuthentication(req.user, req.res)
  }

}
