import { Module } from '@nestjs/common';
import PeopleController from './people.controller';
import { PeopleService } from './people.service';
import { PeoplesService } from './peoples.service';
import HttpClientService from '../diyProviders/httpClient.service';

@Module({
    imports: [],
    exports: [PeopleService],
    controllers: [PeopleController],
    providers: [
        PeopleService,
        PeoplesService,
        {
            provide: 'MY_HTTP',
            useClass: HttpClientService,
        },
    ],
})
export class PeopleModule {}
