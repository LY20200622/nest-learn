/**
 * @description 自定义实现中间件 - 类式
 * @author 雷毅
 */

import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppService } from '../app.service';

@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly appService: AppService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    console.log(`Logger[${this.appService.getHello()}]`);

    console.log('Logger[LoggerMiddleware]');

    next();
  }
}
