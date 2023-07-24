/**
 * @description 自定义拦截器
 * @author 雷毅
 */
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface IResponse<T> {
  data: T;
}

@Injectable()
export default class LoggerInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext, // 执行上下文
    next: CallHandler<T>,
  ): Observable<IResponse<T>> | Promise<Observable<IResponse<T>>> {
    console.log('Logger[LoggerInterceptor] - Before');

    // 调用 next.handle 方法，让 router handle 可以进行处理。其返回的流中，包含了 router handle 的返回值。
    return next.handle().pipe(
      // 进行订阅，从而进行 router handle 之后的处理
      map((value) => ({
        data: value,
      })),
    );
  }
}
