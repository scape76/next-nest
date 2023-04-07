import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/tokens')
  getTokens() {
    return this.appService.getTokens();
  }


  @Get('/users')
  getUsers() {
    return this.appService.getAllUsers();
  }
}
