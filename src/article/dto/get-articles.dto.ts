import { IsNumberString } from 'class-validator';

export class GetArticleDto {
  @IsNumberString()
  page: number;
  @IsNumberString()
  limit: number;
}
