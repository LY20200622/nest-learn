# Custom Decorators

## 定义 Custom Decorators

-   形如

```typescript
// user.decorator.ts
import { createParamDecorator, ExecutionContext, Get } from '@nestjs/common';

export const User = createParamDecorator<string>(
    (data, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const user = req.user;

        return data ? user?.[data] : user;
    },
);

// people.controller.ts
import { Controller } from '@nestjs/common';

@Controller()
export default class PeopleController {
    @Get()
    test(@User('name') user: string) {
        // do something
    }
}
```

## 合并装饰器

-   形如：

```typescript
import { applyDecorators } from '@nestjs/common';

export function Auth(...roles: Role[]) {
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(AuthGuard, RolesGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}
```
