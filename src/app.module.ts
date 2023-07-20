import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import LoggerMiddleware from './middleware/logger.middleware';
import ClassCheckPipe from './pipe/classCheck.pipe';
import { HttpExceptionFilter } from './exception/diyHttpExceptionFilter';

@Module({
  imports: [PeopleModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // 定义的全局 Pipe，从任何一个模块依赖注入即可
      provide: 'APP_PIPE',
      useClass: ClassCheckPipe,
    },
    {
      // 定义的全局 Filter，从任何一个模块依赖注入即可
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 配置使用中间件
    consumer.apply(LoggerMiddleware).forRoutes(AppController);
  }
}
