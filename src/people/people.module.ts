import { Module } from '@nestjs/common';
import PeopleController from './people.controller';
import { PeopleService } from './people.service';
import { People2Service } from './people2.service';
import HttpClientService from '../diyProviders/httpClient.service';

@Module({
  imports: [],
  exports: [PeopleService],
  controllers: [PeopleController],
  providers: [
    PeopleService,
    People2Service,
    {
      provide: 'MY_HTTP',
      useClass: HttpClientService,
    },
  ],
})
export class PeopleModule {}
