import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { PeopleController } from './people/people.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import LoggerMiddleware from './middleware/logger.middleware';
import NothingMiddleware from './middleware/nothing.middleware';

@Module({
  imports: [PeopleModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 配置使用中间件
    consumer
      .apply(LoggerMiddleware, NothingMiddleware)
      .forRoutes(PeopleController);
  }
}
