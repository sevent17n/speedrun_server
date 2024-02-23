import { Article } from 'src/article/article.model';
import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticleController } from './article.controller';

@Module({
  providers: [ArticleService],
  controllers: [ArticleController],
  imports: [SequelizeModule.forFeature([Article])],
})
export class ArticleModule {}
