import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetArticleDto } from './dto/get-articles.dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post('create-article')
  public async createArticle(@Body() dto: CreateArticleDto) {
    return this.articleService.createArticle(dto);
  }

  @Get('get-articles')
  public async getArticles(@Body() dto: GetArticleDto) {
    return this.articleService.getArticles(dto);
  }
}
