import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
export declare class UsersService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAllUsers(): Promise<import(".prisma/client").User[]>;
    getUser(id: number): Promise<UserDto>;
}
