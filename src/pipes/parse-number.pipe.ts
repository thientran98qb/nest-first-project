import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseNumberPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const transformData = parseInt(value, 10);

    if (isNaN(transformData)) {
      throw new BadRequestException('cannot transform input data to number');
    }
    return transformData;
  }
}
