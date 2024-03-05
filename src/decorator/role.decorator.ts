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

/**
 *  获取用户信息装饰器
 *  data - 外部传入的参数
 *  ctx - 执行上下文
 */
export const UseReqUser = createParamDecorator<unknown>(
    (data, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();

        return req.user;
    },
);

/**
 *  获取用户信息装饰器（可提取指定属性）
 *  data - 外部传入的参数。例如：@UseReqUser_2('name') 中，data 的值为 'name'
 *  ctx - 执行上下文
 */
export const UseReqUser_2 = createParamDecorator<string>(
    (data, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const user = req.user;

        return data ? user?.[data] : user;
    },
);

/**
 *  组合多个装饰器为一个
 */
// export function Auth(...roles: Role[]) {
//   return applyDecorators(
//     SetMetadata('roles', roles),
//     UseGuards(AuthGuard, RolesGuard),
//     ApiBearerAuth(),
//     ApiUnauthorizedResponse({ description: 'Unauthorized' }),
//   );
// }
