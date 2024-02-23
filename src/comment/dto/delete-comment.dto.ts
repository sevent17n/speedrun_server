import { IsNumberString } from 'class-validator';

export class DeleteCommentDto {
  @IsNumberString()
  comment_id: number;
}
