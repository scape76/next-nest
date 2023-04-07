import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getTokens(): Promise<import(".prisma/client").Token[]>;
    getUsers(): Promise<import(".prisma/client").User[]>;
}
