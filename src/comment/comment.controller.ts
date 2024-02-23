import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsDto } from './dto/get-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('create-comment')
  public async createComment(@Body() dto: CreateCommentDto) {
    return await this.commentService.createComment(dto);
  }

  @Get('get-comments')
  public async getComment(@Query() dto: GetCommentsDto) {
    return await this.commentService.getComments(dto);
  }

  @Patch('update-comment')
  public async updateComment(@Body() dto: UpdateCommentDto) {
    return await this.commentService.updateComment(dto);
  }

  @Delete('delete-comment')
  public async deleteComment(@Query() dto: DeleteCommentDto) {
    return await this.commentService.deleteComment(dto);
  }
}
