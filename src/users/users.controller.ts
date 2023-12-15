import {
  Controller,
  Post,
  Req,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  FILE_TYPES_REG,
  MAX_SIZE,
  fileFilter,
  storageConfig,
} from '../config/storage';
import { User } from './entities/user.entity';
import { HelperService } from '../utils/helpers.service';

interface RequestValidationFile extends Request {
  errMsg: string;
}

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly helpersService: HelperService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post('upload-avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: storageConfig('avatar'),
      fileFilter: fileFilter,
    }),
  )
  uploadAvatar(
    @Req() request: RequestValidationFile,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: FILE_TYPES_REG }),
          new MaxFileSizeValidator({ maxSize: MAX_SIZE }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    if (request.errMsg) {
      throw new BadRequestException(request.errMsg);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }

    return this.usersService.uploadAvatar(file.path, (request.user as User).id);
  }
}
