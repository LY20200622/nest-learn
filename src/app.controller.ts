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
} from '@nestjs/common';
import { Request } from 'express';
import IndexDto from './dto/index.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getReq(@Req() req: Request) {
    console.log('Cur Req: ', req.query);
  }

  @Get('/name')
  getName(@Query() query): string {
    return query.name;
  }

  @Post('/name')
  @HttpCode(200)
  @Header('My-Diy-Header', 'yep')
  createName(@Body() body: IndexDto): IndexDto {
    console.log('POST - /name ');

    return body;
  }

  @Get('/redirect')
  @Redirect('https://www.baidu.com', 302)
  goDirect() {
    return {
      url: '/',
      statusCode: 302,
    };
  }

  @Get(':id')
  getID(@Param() params): string {
    return params.id;
  }
}
