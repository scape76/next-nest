import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Req,
  Put,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('')
  getPosts() {
    return this.postsService.getPosts();
  }

  @Get('/:id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  createPost(@Body() dto: CreatePostDto, @Req() req: Request) {
    const user = req.user as RequestUser;

    return this.postsService.createPost(dto, user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updatePost(
    @Body() dto: CreatePostDto,
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ) {
    const user = req.user as RequestUser;

    return this.postsService.updatePost(id, dto, user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deletePosts(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as RequestUser;

    return this.postsService.deletePost(id, user.sub);
  }
}
