/**
 * @description 自定义 Exception
 * @author 雷毅
 */

import { HttpException, HttpStatus } from '@nestjs/common';

export default class ForbiddenException extends HttpException {
  constructor() {
    super('FORBIDDEN', HttpStatus.FORBIDDEN);
  }
}
