import {
  Column,
  DataType,
  Index,
  Table,
  Model,
  HasMany,
} from 'sequelize-typescript';
import { Comment } from '../comment/comment.model';

@Table({ tableName: 'articles' })
export class Article extends Model<Article> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Index('article_title_index')
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @HasMany(() => Comment)
  comments: Comment[];
}
