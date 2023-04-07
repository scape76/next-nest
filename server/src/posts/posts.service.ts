import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async getPosts() {
    const postsData = await this.prisma.post.findMany();
    const posts = await Promise.all(
      postsData.map(async (post) => {
        const author = await this.prisma.user.findUnique({
          where: { id: post.authorId },
        });
        const authorDto = new UserDto(author);
        return { ...post, author: authorDto };
      }),
    );
    return posts;
  }

  async getPost(id: number) {
    const postData = await this.prisma.post.findUnique({ where: { id } });
    const author = await this.prisma.user.findUnique({
      where: { id: postData.authorId },
    });
    const authorDto = new UserDto(author);
    return { ...postData, author: authorDto };
  }

  async createPost(dto: CreatePostDto, authorId: number) {
    const createdPost = await this.prisma.post.create({
      data: { ...dto, authorId },
    });
    const author = await this.prisma.user.findUnique({
      where: { id: authorId },
    });
    const authorDto = new UserDto(author);

    return { ...createdPost, author: authorDto };
  }

  async updatePost(id: number, dto: CreatePostDto, authorId: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (post.authorId !== authorId) {
      throw new HttpException(
        "You don't have permissions for deleting this post",
        HttpStatus.FORBIDDEN,
      );
    }

    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: { ...dto },
    });

    const author = await this.prisma.user.findUnique({
      where: { id: updatedPost.authorId },
    });

    const authorDto = new UserDto(author);

    return { ...updatedPost, author: authorDto };
  }

  async deletePost(id: number, authorId: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    console.log(post);
    if (post.authorId !== authorId) {
      throw new HttpException(
        "You don't have permissions for deleting this post",
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.prisma.post.delete({ where: { id } });
  }
}
