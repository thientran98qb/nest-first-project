import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  Logger,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from '../auth/guard/accessToken.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { ParseNumberPipe } from '../pipes/parse-number.pipe';
import { RoleGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/roles.decorator';
// import { ResponseInterceptor } from '@app/interceptors/response.interceptor';
import { ResponseInterceptor } from '../interceptors/response.interceptor';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('posts')
@UseInterceptors(ResponseInterceptor)
@UseGuards(RoleGuard)
export class PostsController {
  constructor(
    private readonly postService: PostsService,
    private readonly logger: Logger,
  ) {}

  @Get()
  @Roles(['admin'])
  list(@I18n() i18n: I18nContext) {
    this.logger.error('tes thu error xem nao');
    // return this.postService.list();
    return i18n.t('validation.test');
  }

  @Get(':id')
  detail(@Param('id', ParseNumberPipe) id: number) {
    console.log('id', typeof id);
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Body() dataPost: CreatePostDto, @Req() request: Request) {
    return this.postService.create(dataPost, request.user);
  }
}
