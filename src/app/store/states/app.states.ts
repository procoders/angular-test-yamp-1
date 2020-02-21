import { TeamState, initialTeamState } from './teams.states';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
    listOfTeams: TeamState;
}

export const initialAppState: AppState = {
    listOfTeams: initialTeamState
};

export const selectList = createFeatureSelector<TeamState>('listOfTeams');

export const selectListTeam = createSelector(
    selectList,
    (state: TeamState) => state.teams
);
