import { Body, Controller, Post, HttpException, HttpStatus, Get, Req, UseGuards } from '@nestjs/common';
import { AuthCredentialDto } from './dtos/auth-credential.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {

  }

  @Post('signUp')
  async signUp(@Body() credential: AuthCredentialDto) {
    const userExist = await this.authService.userExist(credential.username);
    if (userExist) {
      throw new HttpException('username is taken.', HttpStatus.BAD_REQUEST);
    }

    await this.authService.createUser(credential);
  }

  @Post('signIn')
  signIn(@Body() credential: AuthCredentialDto) {
    return this.authService.signIn(credential);
  }

  @UseGuards(AuthGuard())
  @Get('test')
  test(@Req() req) {
    console.log(req);
  }
}
