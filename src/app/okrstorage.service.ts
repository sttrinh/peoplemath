import { Injectable } from '@angular/core';
import { Team } from './team';
import { Period } from './period';
import { Bucket } from './bucket';
import { Person } from './person';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Objective } from './objective';

// TODO Move to backend storage service

const BUCKETS: Bucket[] = [
  new Bucket('First bucket', 40, [
    new Objective('A bucket 1 thing', 6, []),
    new Objective('Another bucket 1 thing', 3, [
      { personId: 'alice', commitment: 2 },
    ]),
  ]),
  new Bucket('Second bucket', 40, [
    new Objective('A bucket 2 thing', 12, []),
    new Objective('Another bucket 2 thing', 1, []),
  ]),
  new Bucket('Third bucket', 20, [
    new Objective('A bucket 3 thing', 3, []),
  ]),
];
const PEOPLE: Person[] = [
  { id: 'alice', displayName: 'Alice Anderson', availability: 3 },
  { id: 'bob', displayName: 'Bob Briggs', availability: 6 },
];

@Injectable()
export class OkrStorageService {

  constructor() { }

  getTeams(): Observable<Team[]> {
    return of([
      { id: 'team1', displayName: 'First Team' },
      { id: 'team2', displayName: 'Second Team' },
    ]);
  }

  getTeam(teamId: string): Observable<Team> {
    return of({ id: teamId, displayName: teamId });
  }

  getPeriods(teamId: string): Observable<Period[]> {
    return of([
      { id: '2018q2', displayName: '2018Q2' },
      { id: '2018q3', displayName: '2018Q3' },
    ]);
  }
  
  getPeriod(teamId: string, periodId: string): Observable<Period> {
    return of({ id: periodId, displayName: periodId, buckets: BUCKETS, people: PEOPLE, unit: 'person weeks' });
  }
}
