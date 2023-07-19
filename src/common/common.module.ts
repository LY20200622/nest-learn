/**
 * @description 全局通用模块，使用 @Global 装饰
 * @author 雷毅
 */

import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  exports: [],
  controllers: [],
  providers: [],
})
export class CommonModule {}
