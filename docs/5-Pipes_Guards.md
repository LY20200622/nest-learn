# Pipes_Guards

## 1 Pipes

1. 被 `@Injectable()` 装饰器修饰
2. 实现 `PipeTransform` 接口

<img src="./assets/Pipe.png" alt="" />

### 1.1 内建 Pipes

-   ValidationPipe
-   DefaultValuePipe
-   ParseIntPipe
-   ParseFloatPipe
-   ParseBoolPipe
-   ParseArrayPipe
-   ParseUUIDPipe
-   ParseEnumPipe
-   ParseFilePipe

### 1.2 使用 Pipes

形如：

```typescript
// people.controller.ts

import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('people')
export default class PeopleController {
    constructor(private readonly someService: SomeService) {}

    @Get(':id')
    async findOneById(@Param('id', ParseIntPipe) id: number) {
        // 1. ParseIntPipe 会保证要么 id 为数值。要么类型转化失败，抛出异常
        // 2. 此处使用了依赖注入。也可以手动传入实例化对象，形如：@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
        return this.someService.find(id);
    }
}
```

### 1.3 自定义 Pipes

1. 基础例子：基本使用

    ```typescript
    // something.pipe.ts

    import {
        ArgumentMetadata,
        Injectable,
        PipeTransform,
    } from '@nestjs/common';

    @Injectable()
    export default class SomethingPipe implements PipeTransform<T, R> {
        // 1. 自定义 Pipe 类需要实现 PipeTransform 接口的 transform 方法
        // 2. value 即 route handle 的参数，例如 1.2 中的 id。metadata 即对应的元数据
        transform(value: T, metadata: ArgumentMetadata): R {
            return value;
        }
    }

    // metadata 数据结构：
    export interface ArgumentMetadata {
        type: 'body' | 'query' | 'param' | 'custom'; // 获取 value 的方式
        metatype?: Type<unknown>; // value 的声明类型
        data?: string; // 传入装饰器的字符串
    }
    // 以 1.2 为例，metadata为
    const metadata = {
        type: 'param',
        metatype: Number,
        data: 'id',
    };
    ```

2. 进阶例子：基于 Schema 的校验

    ```typescript
    // zodValidation.pipe.ts

    @Injectable() // TODO Liam: 官方文档这里没有使用装饰器，需要确认？
    export default class ZodValidationPipe implements PipeTransform {
        constructor(private schema: ZodSchema) {}

        transform(value: unknown, metadata: ArgumentMetadata) {
            try {
                const parsedValue = this.schema.parse(value);

                return parsedValue;
            } catch (error) {
                throw new BadRequestException('Validation failed');
            }
        }
    }

    // someSchema.dto.ts
    import { z } from 'zod';

    export const createSomeSchema = z
        .object({
            name: z.string(),
            age: z.number(),
            breed: z.string(),
        })
        .required();

    export type CreateSomeDto = z.infer<typeof createSomeSchema>;

    // people.controller.ts
    import { Controller } from '@nestjs/common';

    @Controller('people')
    export default class PeopleController {
        @Post('testZod')
        @UsePipes(new ZodValidationPipe(createSomeSchema))
        test(@Body() createSomeDto: CreateSomeDto) {
            // do somethinig
        }
    }
    ```

3. 进阶例子：基于装饰器的校验

## 2 Guards

```

```
