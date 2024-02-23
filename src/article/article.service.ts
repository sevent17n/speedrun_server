import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from './article.model';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetArticleDto } from './dto/get-articles.dto';

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article) private ArticleModel: typeof Article) {}

  public async createArticle(dto: CreateArticleDto) {
    try {
      await this.ArticleModel.create({
        title: dto.title,
        content: dto.content,
      });
      return 'Successful';
    } catch (e) {
      console.error(e);
    }
  }

  public async getArticles(dto: GetArticleDto) {
    try {
      const offset = (dto.page - 1) * dto.limit;

      const { rows: articles, count } = await this.ArticleModel.findAndCountAll(
        {
          offset,
          limit: dto.limit,
        },
      );

      return {
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(count / Number(dto.limit)),
          page: Number(dto.page),
          limit: Number(dto.limit),
        },
        items: articles,
      };
    } catch (e) {
      console.error(e);
    }
  }
}
