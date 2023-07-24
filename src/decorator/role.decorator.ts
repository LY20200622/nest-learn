/**
 * @description 自定义 decorator
 * @author 雷毅
 */

import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';

export default function Role(...role: string[]) {
  return SetMetadata('role', role);
}

export const UseReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    return req.user;
  },
);

// 从 data 接受外部传入的参数
// 用法：
// findSomeOne (@UseReqUser('firstName') firstName: string) { /* ... */ }
export const UseReqUser_2 = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    return data ? user?.[data] : user;
  },
);

// 组合多个装饰器为一个
// export function Auth(...roles: Role[]) {
//   return applyDecorators(
//     SetMetadata('roles', roles),
//     UseGuards(AuthGuard, RolesGuard),
//     ApiBearerAuth(),
//     ApiUnauthorizedResponse({ description: 'Unauthorized' }),
//   );
// }
