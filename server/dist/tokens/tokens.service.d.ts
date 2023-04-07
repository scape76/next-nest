import { PrismaService } from 'src/prisma/prisma.service';
import { GenerateTokenPayloadDto } from './dto/generate-token-payload.dto';
import { JwtService } from '@nestjs/jwt';
export declare class TokensService {
    private prismaService;
    private jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    generateTokens(payload: GenerateTokenPayloadDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    removeToken(token: string): Promise<import(".prisma/client").Token>;
    saveToken(userId: number, token: string): Promise<import(".prisma/client").Token>;
    validateRefreshToken(token: string): Promise<any>;
}
