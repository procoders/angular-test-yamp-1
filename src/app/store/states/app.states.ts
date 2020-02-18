import { TeamState, initialTeamState } from './teams.states';

export interface AppState {
    listOfTeams: TeamState;
}

export const initialAppState: AppState = {
    listOfTeams: initialTeamState
};
