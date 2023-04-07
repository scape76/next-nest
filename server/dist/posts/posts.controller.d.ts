import { PostsService } from './posts.service';
import { Request } from 'express';
export declare class PostsController {
    private postsService;
    constructor(postsService: PostsService);
    getPosts(): Promise<{
        author: import("../users/dto/user.dto").UserDto;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        authorId: number;
    }[]>;
    getPost(id: number): Promise<{
        author: import("../users/dto/user.dto").UserDto;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        authorId: number;
    }>;
    createPost(dto: CreatePostDto, req: Request): Promise<{
        author: import("../users/dto/user.dto").UserDto;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        authorId: number;
    }>;
    updatePost(dto: CreatePostDto, id: number, req: Request): Promise<{
        author: import("../users/dto/user.dto").UserDto;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        authorId: number;
    }>;
    deletePosts(id: number, req: Request): Promise<import(".prisma/client").Post>;
}
