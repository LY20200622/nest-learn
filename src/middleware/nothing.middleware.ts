/**
 * @description 自定义实现中间件 - 函数式
 * @author 雷毅
 */
import { Request, Response, NextFunction } from 'express';

export default function NothingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // do nothing
  console.log('Logger[NothingMiddleware]');
  next();
}
