import { Team } from '@models-app/team.model';

export interface TeamState {
  teams: Team[];
}

export const initialTeamState: TeamState = {
  teams: []
};
