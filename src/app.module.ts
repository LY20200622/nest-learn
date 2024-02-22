import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import LoggerMiddleware from './middleware/logger.middleware';
// import LoggerInterceptor from './interceptor/logger.interceptor';
// import ClassCheckPipe from './pipe/classCheck.pipe';
// import { HttpExceptionFilter } from './exception/diyHttpExceptionFilter';
// import AuthGuard from './guard/auth.guard';

@Module({
    imports: [PeopleModule],
    controllers: [AppController],
    providers: [
        AppService,
        // {
        //   // 注册的全局 Pipe，提供依赖注入的功能，从任何一个模块注册即可
        //   provide: 'APP_PIPE',
        //   useClass: ClassCheckPipe,
        // },
        // {
        //   // 注册的全局 Filter，提供依赖注入的功能，从任何一个模块注册即可
        //   provide: 'APP_FILTER',
        //   useClass: HttpExceptionFilter,
        // },
        // {
        //   // 注册的全局 Guard，提供依赖注入的功能，从任何一个模块注册即可
        //   provide: 'APP_GUARD',
        //   useClass: AuthGuard,
        // },
        // {
        //   // 注册的全局 Interceptor，提供依赖注入的功能，从任何一个模块注册即可
        //   provide: 'APP_INTERCEPTOR',
        //   useClass: LoggerInterceptor,
        // },
    ],
    exports: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // 配置使用中间件
        consumer.apply(LoggerMiddleware).forRoutes(AppController);
    }
}
