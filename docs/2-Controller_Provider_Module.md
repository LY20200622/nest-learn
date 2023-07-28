# Controller_Provider_Module

## 1 Controller

处理进入的 request，返回 response 到客户端。路由机制决定哪个路由由哪个 Controller 处理。

<img src="./assets/Controllers.png" alt="" >

### 1.1 示例

```ts
// 新建 people/people.controller.ts

import { Controller, Get } from '@nestjs/common';

@Controller('people') // 'people' 是可选参数，用来指定路由前缀
export default class PeopleController {
  @Get() // 装饰器的参数可选，此例中对应 '/people' 的路由，若传入 'chinese'，则对应 '/people/chinese'。可以一定的正则形式。
  getAllPeople(): string {
    return 'All People';
  }

  @Get('promise') // 路由 handle 支持异步，Nest 会自己 resolve
  async getAllPeoplePromise(): Promise<string> {
    return 'All People';
  }

  @Get('observable') // 路由 handle 支持流，Nest 会自己订阅
  getAllPeopleObservable(): Observable<string> {
    return of('All People');
  }
}
```

- 使用装饰器 @Controller 定义 PeopleController 类是 Controller

- 使用装饰器 @Get 定义 getAllPeople 方法是一个路由 handle。这个 handle 对应了 get 方法 + '/people' 路由

- 对于 `return 'All People'` 返回值。在 Nest 中，有两种方式处理 Response

  1. 利用 Nest 内建机制。如果返回的是 array 或者 object，Nest 会将他们转换为 JSON，然后进行返回。如果是 JS 的原始类型的值，Nest 会直接返回值。
  2. 处理原生 Response。通过在 handle 中使用 `@Res` 或者 `@Next` 装饰器，可以获取原生 Response 对象，但设置状态码、返回等操作都需要自己完成。例如：`getAllPeople(@Res() res)`，其中，res 就是原生的 Response 对象。

  > 如果想两种方式一起使用，则需要使用形如：@Res({ passthrough: true })。一方面可以获取原生 Response，一方面可以将设置状态码等操作交给 Nest 使用

### 1.2 常用装饰器

- `@Req()、@Request()`。获取请求对象

- `@Res()、@Response()`。获取响应对象

- `@Next()`。代表 next

- `@Session()`。代表 req.session

- `@Query(key?: string)`。代表 req.query 或 req.query[key]

- `@Param(key?: string)`。代表 req.params 或 req.params[key]。需要配合路由参数标记使用，形如：

  ```ts
  @Get(':id')  // 路由参数标记
  findOne(@Param('id') id) {  // 添加了路由参数标记的 handle 需要放在静态路径 handle 的后面
    return id;
  }

  // 或者
  @Get(':id')
  findOne(@Param() params) {
    return params.id;
  }
  ```

- `@Body(key?: string)`。代表 req.body 或 req.body[key]

- `@Headers(name?: string)`。代表 req.headers 或者 req.headers[name]

- `@Ip()`。代表 req.ip

- `@HostParam()`。代表 req.hosts。可以配合 host 参数标记使用：

  - 因为在 `@Controller` 中，可以传入一个包含 host 属性的对象，用来指定接收的请求的 host 必须满足某个值。而且这个 host 的值，可以使用参数标记，可以用 `@HostParam()` 来获取这个参数标记。形如：

  ```ts
  @Controller({ host: ':name.example.com' }) // :name 就是参数标记
  export default class TestController {
    @Get()
    getHostName(@HostParam('name') hostName: string) {
      // 用 @HostParam 获取参数标记，赋值给 hostName
      // ...
    }
  }
  ```

- `@Get()、@Post()、@Put()、@Delete()、@Patch()、@Options()、@Head()、@All()`。分别对应各种的 HTTP 请求方法

- `@HttpCode(statusCode: number)`。设置对应的响应状态码。默认情况下总是 200，除了 Post 方法是 201

- `@Header(key: string, value: string)`。设置自定义的响应头

- `@Redirect(url: string, statusCode: number)`。设置重定向，后者的默认值是 302。可以被如下形式的 handle 的返回值覆盖：

  ```ts
  {
    "url": string,
    "statusCode": number
  }
  ```

### 1.3 使用 DTO

> DTO，即数据传输对象。定义了如何发送数据

可以通过 `interface` 或者 `class` 定义 DTO：

```ts
// people.dto.ts

// class（推荐）
export class PeopleDataDTO {
  name: string;
  age: number;
  country: string;
}

// interface
export interface IPeopleDataDTO {
  name: string;
  age: number;
  country: string;
}

// ==================================================

// people.controller.ts
@Post()
postSomeData(@Body() body: IPeopleDataDTO) {
  // ...
}
```

### 1.4 Controller 的注册

- Controller 总是属于 Module 的，在 Module 中进行 Controller 注册：

```ts
// people.module.ts

@Module({
  controllers: [PeopleController]
})
export default PeopleModule {}
```

## 2 Providers

- 可以被当作依赖进行注入。例如：基于 `constructor` 注入，基于属性注入
- 让对象之间可以建立各种联系，而连接实例之间的工作则可以交付给 Nest 完成
- 定义上，例如：一个使用 `@Injectable` 装饰的 JS 类，将此类在 Module 文件中进行声明当作 Provider
- 使用场景上，例如：Controller 可以将复杂的工作交付给 Provider 进行处理

<img src="./assets/Providers.png" alt="" >

### 2.1 示例

```ts
// 新建 people/people.service.ts。PeopleService 将被声明为一个 Provider

@Injectable() // @Injectable 让其可以被 Nest Ioc 容器进行处理。Ioc （控制反转）容器是一种用于实现依赖注入的软件组件
export default class PeopleService {
  private peopleNames: Array<string> = [];

  getAllPeopleNames(): Array<string> {
    return this.peopleNames;
  }

  saveSomePeopleName(name: string) {
    this.peopleNames.push(name);
  }
}

// ==================================================

// 示例1 - 在 people/people.controller.ts 中进行注入并使用（基于 constructor）

@Controller('people')
export default class PeopleController {
  // 基于 constructor 进行依赖注入
  // Nest 在这步会返回 Provider 的一个实例
  // 这里省略了 @Inject(PeopleService)，因为 Nest 可以根据类型进行注入
  constructor(private readonly peopleService: PeopleService) {}

  getAllPeopleNamesByService(): Array<string> {
    return this.peopleService.getAllPeopleNames(); // 使用方法
  }
}

// 示例2 - 新建 people/anotherPeople.service.ts 进行注入（基于 properties）
@Injectable()
export default class AnotherPeopleService {
  @Inject(PeopleService)
  private readonly peopleService;
}

// ==================================================

// 在 people/people.module.ts 中注册为 provider
@Module({
  controllers: [PeopleController],
  providers: [PeopleService],
})
export default class PeopleModule {}
```

### 2.2 生命周期

一般情况下，Provider 的生命周期和应用是同步的。当应用启动时，Provider 会被注册；当应用关闭时，Provider 会被销毁。特殊情况下，Provider 的生命周期可以设置成以 请求（request）为范围。

### 2.3 可选的 Provider

使用 `@Optional`，形如：

```ts
@Controller('people')
export default class PeopleController {
  // 表明 NoneService 该依赖是可选的，当未找到此依赖时，不会报错而是使用默认值
  constructor(@Optional() private readonly noneService: NoneService) {}
}
```

## 3 Modules

Modules 用来组织应用的结构。任何一个 Nest 应用都至少包含一个模块 - **根模块**。**根模块**是 Nest 构建**应用图**的起点。功能相近的功能可以封装为一个模块

<img src="./assets/Modules.png" alt="" />

### 3.1 示例

```ts
// 新建 people/people.module.ts

@Module({						// Module 类需要使用 @Module 来装饰
  providers: [PeopleService],		// 对应前文的 Providers，将被 Nest 实例化
  controllers: [PeopleController],	// 对应前文的 Controllers，将被 Nest 实例化
  exports: [PeopleService],			// 本模块导出的 providers，将对导入本模块的其他模块可见
  imports: [],			// 本模块导入的其他模块，这些模块导出的 providers，可以被引用
})
export default class PeopleModule {}

// 在 app.module.ts 中
@Module({
  providers: [AppService],
  controllers: [AppController],
  exports: [],
  imports: [PeopleModule],
})
export default class AppModule {}

```

### 3.2 特性

- 模块默认是单例。所以在多个模块之间，可以共享任何 Provider 的同一实例

- Module 类也可以进行依赖注入，但是它们本身不能作为依赖被注入：

  ```ts
  @Module({
    controllers: [PeopleController],
    providers: [PeopleService]
  })
  export default class PeopleModule {
    constructor(private readonly peopleService: PeopleService) {}
  }
  ```

  

### 3.3 模块再导出

- Module 除了导出自己内部的 Providers，还可以导出它导入的模块。如此，导入此模块的模块，也可以使用此模块导入的模块了，形如

```ts
// 假定有另外一个模块 CommonModule

@Module({
  imports: [CommonModule],
  exports: [CommonModule]
})
export default class DirectModule {}

// 导入 DirectModule 的模块，也可以使用 CommonModule
```

### 3.4 全局模块

- 将模块通过 `@Global()` 装饰成全局模块，全局模块的 Providers 全局可见，其他模块无需再 import 此模块即可使用此模块的 Providers
- 全局模块只能注册一次

```ts
@Global()
@Module({
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService],
})
export default class CommonModule {}
```

### 3.5 动态模块

- 动态模块可以动态的注册、配置 Providers 等
- 通过**模块类的静态方法**实现，静态方法返回一个动态模块。如下例中的 forRoot 方法
- 静态方法的返回值和 @Module() 中的数据的关系不是覆盖，而是拓展

```ts
// 以下为一个实际例子

@Module({
  providers: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);

    // 返回值支持同步和异步
    return {
      global: false,
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
```

+ 动态模块的导入和导出，形如：

```ts
// 紧接上述例子

@Module({
  imports: [DatabaseModule.forRoot(User)],
  exports: [DatabaseModule]		// 再导出可省略静态方法 forRoot
})
export default class AppModule {}
```























