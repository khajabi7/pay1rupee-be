import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async create(comment: Partial<Comment>): Promise<Comment> {
    try {
      const newComment = this.commentsRepository.create({
        ...comment,
        createdAt: new Date(),
      });
      return await this.commentsRepository.save(newComment);
    } catch (error) {
      console.error('Error in CommentsService.create:', error);
      throw new Error('Failed to save comment: ' + (error as Error).message);
    }
  }

  async findAll(): Promise<Comment[]> {
    return this.commentsRepository.find();
  }
}