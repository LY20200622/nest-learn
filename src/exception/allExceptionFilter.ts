/**
 * @description 扩展 内建默认全局异常处理器
 * @author 雷毅
 */

import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch() // 代表需要捕获全部的异常
export default class AllExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    // anything 你需要的操作

    // 调用父类的处理
    super.catch(exception, host);
  }
}
