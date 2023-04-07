import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { TokensService } from 'src/tokens/tokens.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokensService: TokensService,
  ) {}

  async generateTokens(user: User) {
    const payload = { email: user.email, sub: user.id };
    const tokens = await this.tokensService.generateTokens(payload);
    return { ...tokens, user };
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (candidate) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword: string = bcrypt.hashSync(dto.password, 5);

    const user: User = await this.prisma.user.create({
      data: { ...dto, password: hashedPassword },
    });

    const userDto = new UserDto(user);

    const tokens = await this.generateTokens(user);

    await this.tokensService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new HttpException(
        "User with such email doesn't exist",
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordEqual = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordEqual) {
      throw new HttpException('Password is incorrect', HttpStatus.BAD_REQUEST);
    }

    const tokens = await this.generateTokens(user);

    await this.tokensService.saveToken(user.id, tokens.refreshToken);
    
    const userDto = new UserDto(user);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string) {
    const tokenData = await this.tokensService.removeToken(refreshToken);
    return tokenData;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const userData = await this.tokensService.validateRefreshToken(
      refreshToken,
    );
    const tokenFromDb = await this.prisma.token.findUnique({
      where: { refreshToken },
    });
    if (!userData || !tokenFromDb) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const user = await this.prisma.user.findUnique({
      where: { id: userData.sub },
    });
    
    const tokens = await this.generateTokens(user);
    
    const userDto = new UserDto(user);
    
    await this.tokensService.saveToken(user.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}
