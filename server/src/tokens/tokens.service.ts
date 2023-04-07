import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GenerateTokenPayloadDto } from './dto/generate-token-payload.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  public async generateTokens(payload: GenerateTokenPayloadDto) {
    const accessToken: string = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '3h',
    });
    const refreshToken: string = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '10d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public async removeToken(token: string) {
    const tokenData = await this.prismaService.token.delete({
      where: { refreshToken: token },
    });
    return tokenData;
  }

  public async saveToken(userId: number, token: string) {
    const tokenData = await this.prismaService.token.findUnique({
      where: { userId },
    });

    if (tokenData) {
      const newTokenData = await this.prismaService.token.update({
        where: {
          userId,
        },
        data: {
          refreshToken: token,
        },
      });

      return newTokenData;
    }
    const createdToken = await this.prismaService.token.create({
      data: { userId, refreshToken: token },
    });

    return createdToken;
  }

  public async validateRefreshToken(token: string) {
    try {
      const userData = await this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return userData;
    } catch (e) {
      return null;
    }
  }
}
