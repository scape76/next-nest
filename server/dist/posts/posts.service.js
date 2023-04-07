"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const user_dto_1 = require("../users/dto/user.dto");
let PostsService = class PostsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPosts() {
        const postsData = await this.prisma.post.findMany();
        const posts = await Promise.all(postsData.map(async (post) => {
            const author = await this.prisma.user.findUnique({
                where: { id: post.authorId },
            });
            const authorDto = new user_dto_1.UserDto(author);
            return Object.assign(Object.assign({}, post), { author: authorDto });
        }));
        return posts;
    }
    async getPost(id) {
        const postData = await this.prisma.post.findUnique({ where: { id } });
        const author = await this.prisma.user.findUnique({
            where: { id: postData.authorId },
        });
        const authorDto = new user_dto_1.UserDto(author);
        return Object.assign(Object.assign({}, postData), { author: authorDto });
    }
    async createPost(dto, authorId) {
        const createdPost = await this.prisma.post.create({
            data: Object.assign(Object.assign({}, dto), { authorId }),
        });
        const author = await this.prisma.user.findUnique({
            where: { id: authorId },
        });
        const authorDto = new user_dto_1.UserDto(author);
        return Object.assign(Object.assign({}, createdPost), { author: authorDto });
    }
    async updatePost(id, dto, authorId) {
        const post = await this.prisma.post.findUnique({ where: { id } });
        if (post.authorId !== authorId) {
            throw new common_1.HttpException("You don't have permissions for deleting this post", common_1.HttpStatus.FORBIDDEN);
        }
        const updatedPost = await this.prisma.post.update({
            where: { id },
            data: Object.assign({}, dto),
        });
        const author = await this.prisma.user.findUnique({
            where: { id: updatedPost.authorId },
        });
        const authorDto = new user_dto_1.UserDto(author);
        return Object.assign(Object.assign({}, updatedPost), { author: authorDto });
    }
    async deletePost(id, authorId) {
        const post = await this.prisma.post.findUnique({ where: { id } });
        console.log(post);
        if (post.authorId !== authorId) {
            throw new common_1.HttpException("You don't have permissions for deleting this post", common_1.HttpStatus.FORBIDDEN);
        }
        return await this.prisma.post.delete({ where: { id } });
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map