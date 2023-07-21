/**
 * @description 自定义 Guard
 * @author 雷毅
 */

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    // 执行上下文
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 获取要求目标的角色
    const targetRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!targetRoles) {
      return true;
    }
    // 获取当前角色
    const req = context.switchToHttp().getRequest();
    const currentRole = req.user;

    // 将 currentRole 和 targetRoles 进行比较，判断返回是否能执行该请求
    // ...
    console.log(
      `currentRole: ${currentRole} - targetRoles: ${targetRoles.join('、')}`,
    );

    return false;
  }
}
