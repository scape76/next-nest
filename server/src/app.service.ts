import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async getTokens() {
    const tokens = await this.prisma.token.findMany();
    return tokens;
  }
}
