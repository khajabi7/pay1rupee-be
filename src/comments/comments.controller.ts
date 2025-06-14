import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() comment: Partial<Comment>): Promise<Comment> {
    return this.commentsService.create(comment);
  }

  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }
}