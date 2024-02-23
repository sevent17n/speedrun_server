import { Comment } from './comment.model';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from 'src/article/article.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsDto } from './dto/get-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private CommentModel: typeof Comment,
    @InjectModel(Article) private ArticleModel: typeof Article,
  ) {}

  public async createComment(dto: CreateCommentDto) {
    try {
      const article = await this.ArticleModel.findByPk(dto.article_id);

      if (!article) throw new NotAcceptableException('Запись не найдена');

      await this.CommentModel.create({
        title: dto.title,
        content: dto.content,
        article_id: article?.id,
      });

      return 'Succesful';
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async getComments(dto: GetCommentsDto) {
    try {
      const offset = (dto.page - 1) * dto.limit;

      const { rows: comments, count } = await this.CommentModel.findAndCountAll(
        {
          where: { article_id: dto.article_id },
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
        items: comments,
      };
    } catch (e) {
      console.error(e);
    }
  }

  public async deleteComment(dto: DeleteCommentDto) {
    try {
      const comment = await this.CommentModel.findByPk(dto.comment_id);
      if (!comment) throw new NotAcceptableException('Запись не найдена');

      await comment.destroy();

      return 'Succesful';
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async updateComment(dto: UpdateCommentDto) {
    try {
      const comment = await this.CommentModel.findByPk(dto.comment_id);

      if (!comment) throw new NotAcceptableException('Запись не найдена');

      if (dto.title) comment.title = dto.title;
      if (dto.content) comment.content = dto.content;

      await comment.save();

      return 'Succesful';
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
