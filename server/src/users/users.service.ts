import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async getUser(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    const userDto = new UserDto(user);
    return userDto;
  }
}
