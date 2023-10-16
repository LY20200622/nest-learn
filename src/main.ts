import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import LoggerInterceptor from './interceptor/logger.interceptor';
// import AuthGuard from './guard/auth.guard';
// import ClassCheckPipe from './pipe/classCheck.pipe';
// import NothingMiddleware from './middleware/nothing.middleware';
// import { HttpExceptionFilter } from './exception/diyHttpExceptionFilter';
// import AllExceptionFilter from './exception/allExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 使用全局中间件
  // app.use(NothingMiddleware);

  // 使用扩展的全局异常处理器
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionFilter(httpAdapter));

  // 使用全局自定义异常处理器
  // app.useGlobalFilters(new HttpExceptionFilter());

  // 使用全局验证 Pipe
  // app.useGlobalPipes(new ClassCheckPipe());

  // 使用全局 Guard
  // app.useGlobalGuards(new AuthGuard());

  // 使用全局 Interceptor
  // app.useGlobalInterceptors(new LoggerInterceptor());

  await app.listen(3000);
}

bootstrap();
