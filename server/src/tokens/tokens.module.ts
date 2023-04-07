import { Module, Global } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokensService } from './tokens.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  providers: [TokensService, PrismaService, JwtService],
  exports: [TokensService],
  imports: [AuthModule],
})
export class TokensModule {}
