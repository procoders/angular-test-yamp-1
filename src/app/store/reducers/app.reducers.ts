import { teamReducers } from './teams.reducers';
import { AppState } from '../states/app.states';
import { ActionReducerMap } from '@ngrx/store';

export const appReducers: ActionReducerMap<AppState, any> = {
    listOfTeams: teamReducers
};
