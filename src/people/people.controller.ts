import { Controller, Get, UseFilters } from '@nestjs/common';
import { PeopleService } from './people.service';
import { HttpExceptionFilter } from '../exception/diyHttpExceptionFilter';

@Controller('/people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  getAllPeople(): string {
    const text = this.peopleService.getAllPeople();

    console.log(text);

    return text;
  }

  @Get('/error')
  @UseFilters(HttpExceptionFilter) // 使用 自定义异常处理器
  getError() {
    this.peopleService.getError();
  }
}
