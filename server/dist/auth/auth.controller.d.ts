import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response, Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registration(dto: CreateUserDto, res: Response): Promise<{
        user: import("../users/dto/user.dto").UserDto;
        accessToken: string;
        refreshToken: string;
    }>;
    login(dto: CreateUserDto, res: Response): Promise<{
        user: import("../users/dto/user.dto").UserDto;
        accessToken: string;
        refreshToken: string;
    }>;
    logout(req: Request, res: Response): Promise<import(".prisma/client").Token>;
    refresh(req: Request, res: Response): Promise<{
        user: import("../users/dto/user.dto").UserDto;
        accessToken: string;
        refreshToken: string;
    }>;
}
