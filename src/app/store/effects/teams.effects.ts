import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '@services-app/local-storage.service';
import { of } from 'rxjs';
import { map, tap, mergeMap, withLatestFrom } from 'rxjs/operators';

import { TeamService, keyName } from '@services-app/teams.service';

import {
  TeamsActionsList,
  GetTeamsSuccess,
  GetTeamsStorageSuccess
} from '@store-app/actions/teams.actions';
import { TeamState } from '@store-app/states/teams.states';

@Injectable({
  providedIn: 'root'
})
export class TeamEffects {

  constructor(
    private store: Store<TeamState>,
    private actions$: Actions,
    private teamService: TeamService,
    private localStorageService: LocalStorageService
  ) {}

  /**
   * Get data from API
   */
  @Effect()
  getTeams$ = this.actions$.pipe(
    ofType(TeamsActionsList.GetTeams),
    mergeMap(() => this.teamService.getTeams().pipe(
      tap(teams => this.localStorageService.setSavedState(teams, keyName)),
      map(teams => new GetTeamsSuccess(teams))
    ) )

  );

 /**
  * Get data from localStorage
  */
  @Effect()
  getStorageTeams$ = this.actions$.pipe(
    ofType(TeamsActionsList.GetTeamsStorage),
    mergeMap(() => of(this.localStorageService.getSavedState(keyName)).pipe(
      map(teams => {
        return new GetTeamsStorageSuccess(teams); })
    ) )

  );

  @Effect()
  setStorageTeams$ = this.actions$.pipe(
    ofType(TeamsActionsList.SetTeamStorage),
    withLatestFrom(this.store),
    map( ([action, storeState]) => {
      return of(this.localStorageService.setSavedState(storeState.teams, keyName));
    })
  );

}
