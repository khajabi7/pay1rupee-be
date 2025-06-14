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
    const newComment = this.commentsRepository.create(comment);
    return this.commentsRepository.save(newComment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentsRepository.find({ order: { createdAt: 'DESC' } });
  }
}