import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
// import NothingMiddleware from './middleware/nothing.middleware';
import { HttpExceptionFilter } from './exception/diyHttpExceptionFilter';
// import AllExceptionFilter from './exception/allExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 使用全局中间件
  // app.use(NothingMiddleware);

  // 使用扩展的全局异常处理器
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionFilter(httpAdapter));

  // 使用全局自定义异常处理器
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}

bootstrap();
