/**
 * @description 自定义 Pipe（验证。使用第三方库 class-validator、class-transformer)
 * @author 雷毅
 */

import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export default class ClassCheckPipe implements PipeTransform {
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    const obj = plainToInstance(metatype, value);
    const errors = await validate(obj);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    } else {
      return value;
    }
  }
}
