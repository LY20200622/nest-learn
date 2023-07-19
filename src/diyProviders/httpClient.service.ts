// 自定义 Provider
import { Injectable } from '@nestjs/common';

@Injectable()
export default class HttpClientService {
  getHttp() {
    console.log('This is HttpClientService');
  }
}
