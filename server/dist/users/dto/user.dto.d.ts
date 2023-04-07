import { User } from '@prisma/client';
export declare class UserDto {
    email: string;
    name?: string;
    id: number;
    constructor(user: User);
}
