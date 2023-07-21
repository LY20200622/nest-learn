/**
 * @description 自定义 decorator
 * @author 雷毅
 */

import { SetMetadata } from '@nestjs/common';

export default function Role(...role: string[]) {
  return SetMetadata('role', role);
}
