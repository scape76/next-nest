import { Body, Controller, Get, Post, Res, Req, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response, Request } from 'express';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  async registration(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userData = await this.authService.registration(dto);
    res.cookie('token', userData.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 10,
    });
    return userData;
  }

  @Post('login')
  async login(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userData = await this.authService.login(dto);
    res.cookie('token', userData.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 10,
    });
    return userData;
  }

  @Get('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies['token'];
    res.clearCookie('token');
    return this.authService.logout(token);
  }

  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = req.cookies['token'];
    const userData = await this.authService.refresh(token);
    res.cookie('token', userData.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 10,
    });
    return userData;
  }
}
