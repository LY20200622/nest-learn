import {
    Controller,
    Get,
    Post,
    Header,
    Req,
    Query,
    Param,
    Body,
    HttpCode,
    Redirect,
    ParseIntPipe,
    UsePipes,
    DefaultValuePipe,
} from '@nestjs/common';
import { Request } from 'express';
import IndexDto, { SubIndexDto, indexJoiSchema } from './dto/index.dto';
import { AppService } from './app.service';
import NothingPipe from './pipe/nothing.pipe';
import CheckPipe from './pipe/check.pipe';
import ClassCheckPipe from './pipe/classCheck.pipe';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('/req')
    getReq(@Req() req: Request) {
        console.log('Cur Req: ', req.query);
        return 'req route';
    }

    @Get('/name')
    getName(@Query() query): string {
        return query.name;
    }

    @Get('/redirect')
    @Redirect('https://www.baidu.com', 302)
    goDirect() {
        return {
            url: '/',
            statusCode: 302,
        };
    }

    // 在方法参数层面使用 Pipe（验证）
    @Post('/name')
    @UsePipes(new CheckPipe(indexJoiSchema))
    @HttpCode(200)
    @Header('My-Diy-Header', 'yep')
    createName(@Body() body: IndexDto): IndexDto {
        console.log('POST - /name ');
        console.log(
            `type - name: ${typeof body.name}、age: ${typeof body.age}、work: ${typeof body.work}`,
        );

        return body;
    }

    @Post('/name2')
    createName2(@Body(ClassCheckPipe) body: SubIndexDto): SubIndexDto {
        console.log('POST - /name2 ');
        console.log(
            `type - name: ${typeof body.name}、width: ${typeof body.width}、height: ${typeof body.height}`,
        );

        return body;
    }

    // 在方法参数层面使用 Pipe（转换）、在转换 Pipe 前使用默认值 Pipe
    @Get('/checkNum/:id')
    getID(
        @Param('id', new DefaultValuePipe(0), ParseIntPipe, NothingPipe) id,
    ): string {
        return `id: ${id}、type: ${typeof id}`;
    }
    // Ext: 除了传入类名，让 Nest 进行实例化并开启依赖注入。也可以自己实例化，一般在需要传入 options 的时候使用
    // @Get(':id')
    // getID(
    //   @Param(
    //     'id',
    //     new ParseIntPipe({
    //       errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
    //     }),
    //   )
    //   id: number,
    // ): string {
    //   return `id: ${id}、type: ${typeof id}`;
    // }
}
