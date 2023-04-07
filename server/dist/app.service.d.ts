import { PrismaService } from './prisma/prisma.service';
export declare class AppService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUsers(): Promise<import(".prisma/client").User[]>;
    getTokens(): Promise<import(".prisma/client").Token[]>;
}
