import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<import(".prisma/client").User[]>;
    getUser(id: number): Promise<import("./dto/user.dto").UserDto>;
}
