import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsNumber()
  comment_id: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
