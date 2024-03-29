import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comment.model';
import { Article } from 'src/article/article.model';

@Module({
  providers: [CommentService],
  controllers: [CommentController],
  imports: [SequelizeModule.forFeature([Comment, Article])],
})
export class CommentModule {}
