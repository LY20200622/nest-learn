import { Inject, Injectable } from '@nestjs/common';
import { PeopleService } from './people.service';

@Injectable()
export class PeoplesService {
    @Inject(PeopleService)
    private readonly peopleService: PeopleService;

    getPeopleNamesFromPeopleService() {
        return this.peopleService.getAllPeople();
    }
}
