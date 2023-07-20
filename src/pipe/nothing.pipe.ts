/**
 * @description 自定义 Pipe（转换）- 将其他类型的输入转为数值
 * @author 雷毅
 */

import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export default class NothingPipe implements PipeTransform<unknown, number> {
  transform(value: unknown, metadata: ArgumentMetadata) {
    console.log(value, metadata);

    const tempValue = typeof value !== 'number' ? +value : value;

    return tempValue || 0;
  }
}
