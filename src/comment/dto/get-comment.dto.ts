import { IsNumberString } from 'class-validator';

export class GetCommentsDto {
  @IsNumberString()
  page: number;
  @IsNumberString()
  limit: number;
  @IsNumberString()
  article_id: number;
}
