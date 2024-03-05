# Interceptors

1. 被 `@Injectable()` 装饰器装饰
2. 实现 `NestInterceptor` 接口
3. 可以在 route handler 执行的 **前**、**后** 加入逻辑

<img src="./assets/Interceptors.png" alt="" />

## 1.1 使用 Interceptors

-   形如

```typescript
// my.interceptor.ts
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export default class MyInterceptors implements NestInterceptor<T, R> {
    // 需要实现 NestInterceptor 接口的 intercept 方法
    // context:ExecutionContext - 执行上下文
    // next:CallHandler - CallHandler 接口实现了 handle() 方法，用于调用 route handler
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<R> {
        // ... 此处代码会在 route handler 执行之前执行

        return next
            .handle() // 调用 next.handle() 即调用 route handler，此处相当于一个 PointCut
            .xxxxx((v) => {
                // ... 此处代码会在 route handler 执行之后执行
            });
    }
}

// people.controller.ts
import { UseInterceptors } from '@nestjs/common';
@UseInterceptors(MyInterceptors)
export default class PeopleController {}
```

### 1.2 全局 Interceptors

```typescript
const app = await NestFactory.create(AppModule);

app.useGlobalInterceptors(new LoggingInterceptor());

// 或者
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
    ],
})
export class AppModule {}
```
