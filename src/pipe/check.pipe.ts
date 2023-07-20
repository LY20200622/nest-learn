/**
 * @description 自定义 Pipe（验证。使用第三方库 joi）
 * @author 雷毅
 */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export default class CheckPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);

    if (error) {
      return new BadRequestException('Validation failed');
    }

    return value;
  }
}
