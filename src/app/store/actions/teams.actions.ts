import { Action } from '@ngrx/store';

import { Team } from '@models-app/team.model';

export enum TeamsActionsList {
    SetTeamStorage = '[LocalStorage] Set teams',
    GetTeamsStorage = '[LocalStorage] Get teams',
    GetTeamsStorageSuccess = '[LocalStorage] Get teams success',
    GetTeams = '[API CALL] Get teams Data',
    GetTeamsSuccess = '[API CALL] Get Teams Data Success',
    GetTeamsError = '[API CALL] Get Teams Data Error',
    UpdateTeam = '[Dialog window] Team is updated',
    CreateTeam = '[Dialog window ] Team is created',
    RemoveTeam = '[Team Item] Team is removed'
}

export class SetTeamStorage implements Action {
    readonly type = TeamsActionsList.SetTeamStorage;

    constructor(public payload: Team[]) {}
}


export class GetTeamsStorageSuccess implements Action {
    readonly type = TeamsActionsList.GetTeamsStorageSuccess;

    constructor(public payload: Team[]) {}
}


export class GetTeamsStorage implements Action {
    readonly type = TeamsActionsList.GetTeamsStorage;
}

export class UpdateTeam implements Action {
    readonly type = TeamsActionsList.UpdateTeam;

    constructor(public payload: Team) {}
}

export class GetTeams implements Action {
    readonly type = TeamsActionsList.GetTeams;
}

export class GetTeamsSuccess implements Action {
    readonly type = TeamsActionsList.GetTeamsSuccess;

    constructor(public payload: Team[]) {}
}

export class GetTeamsError implements Action {
    readonly type = TeamsActionsList.GetTeamsError;
}

export class CreateTeam implements Action {
    readonly type = TeamsActionsList.CreateTeam;

    constructor(public payload: Team) {}
}

export class RemoveTeam implements Action {
    readonly type = TeamsActionsList.RemoveTeam;

    constructor(public payload: Team) {}
}

export type TeamsActions = GetTeams | GetTeamsSuccess | GetTeamsError |
            UpdateTeam | CreateTeam | RemoveTeam |
            GetTeamsStorage | GetTeamsStorageSuccess | SetTeamStorage;
