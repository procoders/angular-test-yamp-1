import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { v4 as uuid } from 'uuid';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from '@models-app/team.model';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

    private readonly teamsUrl = 'https://api.opendota.com/api/teams';
    constructor(
        private http: HttpClient,
    ) { }


    getTeams(): Observable<Team[]> {
        return this.http.get<Team[]>(this.teamsUrl)
            .pipe(
                map(res => {
                  let teams = res.slice(0, 4);
                  teams = teams
                    .filter(team => team.name)
                    .map(item => {
                      delete item.losses;
                      delete item.tag;
                      delete item.logo_url;
                      delete item.last_match_time;
                      item.team_id = this.generateUI();
                      return item;
                    });
                  return teams;
                }),
            );
    }

    generateUI(): string {
      return uuid();
    }

}

export const keyName = 'teams';

export enum windowTypes {
  edit = 'edit',
  new = 'new',
  delete = 'delete',
}
