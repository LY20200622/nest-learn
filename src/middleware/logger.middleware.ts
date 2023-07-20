/**
 * @description 自定义实现中间件 - 类式
 * @author 雷毅
 */

import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.log('Logger[LoggerMiddleware]');

    next();
  }
}
