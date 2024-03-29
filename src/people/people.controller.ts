import {
    Controller,
    Get,
    Param,
    SetMetadata,
    UseFilters,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { HttpExceptionFilter } from '../exception/diyHttpExceptionFilter';
import AuthGuard from 'src/guard/auth.guard';
import Role from 'src/decorator/role.decorator';
import LoggerInterceptor from 'src/interceptor/logger.interceptor';
import { PeoplesService } from './peoples.service';
import NothingPipe from '../pipe/nothing.pipe';

@Controller('people')
@UseGuards(AuthGuard)
@UseInterceptors(LoggerInterceptor)
export default class PeopleController {
    constructor(
        private readonly peopleService: PeopleService,
        private readonly peoplesService: PeoplesService,
    ) {}

    @Get()
    getAllPeople(): string {
        return this.peopleService.getAllPeople();
    }

    @Get('/another')
    getAllPeople2(): string {
        return this.peoplesService.getPeopleNamesFromPeopleService();
    }

    @Get('/error')
    @UseFilters(HttpExceptionFilter) // 使用 自定义异常处理器
    getError() {
        this.peopleService.getError();
    }

    @Get('/admin')
    // 为 handle 设置元数据。也可以使用自定义 decorator，如下 /admin_2 的例子。
    // 可配合 Guard 的执行上下文使用
    @SetMetadata('role', ['admin'])
    getAdminData() {
        this.peopleService.getAdminData();
    }

    @Get('/admin_2')
    @Role('admin')
    getAdminData_2() {
        this.peopleService.getAdminData();
    }

    @Get(':uid')
    getOneByUid(@Param('uid', NothingPipe) uid: string) {
      return uid;
    }
}
