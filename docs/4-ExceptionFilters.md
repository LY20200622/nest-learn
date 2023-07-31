# 4 ExceptionFilters

Nest 内置一个**异常层**，负责处理应用程序中未被捕获的异常，即未被业务代码捕获的异常，都将由其捕获。这种机制由内建的 `Global Exception Filter` 完成，它处理类型为 `HttpException` 的异常，当异常不是此种类型时，其无法识别并抛出如下错误：

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

<img alt="" src="./assets/Filters.png" />

## 1.1 标准异常

- Nest 提供了一个内建的标准异常类 `HttpException`，使用如下：

```ts
// people.controller.ts

@Get('error')
throwAError() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```

其对应的返回响应如下：

```json
{
  "statusCode": 403,
  "message": "Forbidden"
}
```

+  `new HttpException(response, status, options)` 接收两个必填参数和一个可选参数
  1. response 定义 JSON 响应体，可以为一个字符串，也可为一个对象。若为对象，其结构为：
     1. statusCode。默认为 status 的值
     2. message。对错误的描述
  2. status 定义 HTTP 状态码
  3. options 中可以定义 case，case 不会序列化后展示给用户，但可用于将内部错误记录于日志。

## 1.2 自定义异常

即继承标准 `HttpException` 创建自己的 Exception 类。例如：

```ts 
// 新增 fastForbidden.exception.ts

export default class FastForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

// people.controller.ts
@Get('diyError')
throwADiyError() {
  throw new FastForbiddenException();
}
```















