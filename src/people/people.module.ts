import { Module } from '@nestjs/common';
import PeopleController from './people.controller';
import { PeopleService } from './people.service';
import HttpClientService from '../diyProviders/httpClient.service';

@Module({
  imports: [],
  exports: [PeopleService],
  controllers: [PeopleController],
  providers: [
    PeopleService,
    {
      provide: 'MY_HTTP',
      useClass: HttpClientService,
    },
  ],
})
export class PeopleModule {}
