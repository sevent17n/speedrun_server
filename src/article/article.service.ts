import { Comment } from './comment.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment) private CommentModel: typeof Comment) {}
}
