/**
 * @description 自定义拦截器
 * @author 雷毅
 */
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export default class LoggerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext, // 执行上下文
    next: CallHandler<number>,
  ): Observable<string> | Promise<Observable<string>> {
    console.log('Logger[LoggerInterceptor] - Before');

    // 调用 next.handle 方法，让 router handle 可以进行处理
    return next.handle().pipe(map((value) => value.toString())); // 进行订阅，从而进行 router handle 之后的处理
  }
}
