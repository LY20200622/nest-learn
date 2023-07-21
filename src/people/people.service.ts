import {
  Injectable,
  Optional,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import HttpClientService from '../diyProviders/httpClient.service';
// import ForbiddenException from 'src/exception/forbiddenException';

@Injectable()
export class PeopleService {
  // Optional 可选注入
  // Inject 使用自定义 Provider
  // 基于 constructor 的注入
  constructor(
    @Optional() @Inject('MY_HTTP') private httpClientService: HttpClientService,
  ) {}

  // 基于 properties 的注入
  // @Inject('MY_HTTP_2') private httpClient2;
  getAllPeople() {
    return 'All People!';
  }

  callHttp() {
    this.httpClientService.getHttp();
  }

  // 模拟服务器异常
  getError() {
    try {
      (undefined as any).toString();
    } catch (e) {
      // 使用自定义的 Exception
      // throw new ForbiddenException();

      throw new HttpException(
        {
          error: -1,
          msg: '服务器内部错误',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: e,
        },
      );
    }
  }

  getAdminData() {
    return 'This is Admin Data';
  }
}
