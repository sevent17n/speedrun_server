import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  article_id: number;
  @IsString()
  title: string;
  @IsString()
  content: string;
}
