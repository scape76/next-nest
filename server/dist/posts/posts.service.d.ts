import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/users/dto/user.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    getPosts(): Promise<{
        author: UserDto;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        authorId: number;
    }[]>;
    getPost(id: number): Promise<{
        author: UserDto;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        authorId: number;
    }>;
    createPost(dto: CreatePostDto, authorId: number): Promise<{
        author: UserDto;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        authorId: number;
    }>;
    updatePost(id: number, dto: CreatePostDto, authorId: number): Promise<{
        author: UserDto;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        authorId: number;
    }>;
    deletePost(id: number, authorId: number): Promise<import(".prisma/client").Post>;
}
