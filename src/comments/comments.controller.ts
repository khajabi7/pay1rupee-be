import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() comment: Partial<Comment>): Promise<Comment> {
try {
         return await this.commentsService.create(comment);
       } catch (error) {
         console.error('Error creating comment:', error);
         throw new HttpException(
           'Failed to create comment: ' + (error as Error).message,
           HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
    }

  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }
}