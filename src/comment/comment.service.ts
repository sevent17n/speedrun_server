import { Comment } from './comment.model';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from 'src/article/article.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsDto } from './dto/get-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private CommentModel: typeof Comment,
    @InjectModel(Article) private ArticleModel: typeof Article,
    private sequelize: Sequelize,
  ) {}

  public async createComment(dto: CreateCommentDto) {
    return await this.sequelize.transaction(async (transaction) => {
      try {
        const article = await this.ArticleModel.findByPk(dto.article_id, {
          transaction,
        });

        if (!article) throw new NotAcceptableException('Запись не найдена');

        await this.CommentModel.create(
          {
            title: dto.title,
            content: dto.content,
            article_id: article?.id,
          },
          { transaction },
        );

        return 'Succesful';
      } catch (e) {
        console.error(e);
        throw e;
      }
    });
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
    return await this.sequelize.transaction(async (transaction) => {
      try {
        const comment = await this.CommentModel.findByPk(dto.comment_id, {
          transaction,
        });

        if (!comment) throw new NotAcceptableException('Запись не найдена');

        await comment.destroy({ transaction });

        return 'Succesful';
      } catch (e) {
        console.error(e);
        throw e;
      }
    });
  }

  public async updateComment(dto: UpdateCommentDto) {
    return await this.sequelize.transaction(async (transaction) => {
      try {
        const comment = await this.CommentModel.findByPk(dto.comment_id, {
          transaction,
        });

        if (!comment) throw new NotAcceptableException('Запись не найдена');

        if (dto.title) comment.title = dto.title;
        if (dto.content) comment.content = dto.content;

        await comment.save({ transaction });

        return 'Succesful';
      } catch (e) {
        console.error(e);
        throw e;
      }
    });
  }
}
