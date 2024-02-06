import { Inject, Injectable } from '@nestjs/common';
import { PeopleService } from './people.service';

@Injectable()
export class People2Service {
  @Inject(PeopleService)
  private readonly peopleService: PeopleService;

  getPeopleNamesFromPeopleService() {
    return this.peopleService.getAllPeople();
  }
}
