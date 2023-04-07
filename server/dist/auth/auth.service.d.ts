import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { TokensService } from 'src/tokens/tokens.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
export declare class AuthService {
    private prisma;
    private tokensService;
    constructor(prisma: PrismaService, tokensService: TokensService);
    generateTokens(user: User): Promise<{
        user: User;
        accessToken: string;
        refreshToken: string;
    }>;
    registration(dto: CreateUserDto): Promise<{
        user: UserDto;
        accessToken: string;
        refreshToken: string;
    }>;
    login(dto: CreateUserDto): Promise<{
        user: UserDto;
        accessToken: string;
        refreshToken: string;
    }>;
    logout(refreshToken: string): Promise<import(".prisma/client").Token>;
    refresh(refreshToken: string): Promise<{
        user: UserDto;
        accessToken: string;
        refreshToken: string;
    }>;
}
