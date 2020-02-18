import { TeamState, initialTeamState } from '@store-app/states/teams.states';
import { TeamsActionsList, TeamsActions } from '@store-app/actions/teams.actions';
import { keyName } from '@services-app/teams.service';

export const teamReducers = (
    state = initialTeamState,
    action: TeamsActions
): TeamState => {
    switch (action.type) {
        case TeamsActionsList.GetTeamsSuccess: {
            return {
                ...state,
                teams: action.payload
            };
        }

        case TeamsActionsList.GetTeamsError: {
            return {
                    ...state,
                    teams: []
            };
        }

        case TeamsActionsList.UpdateTeam: {
           const id = action.payload.team_id;
           const index = currentIndex(state.teams, id);
           localStorage.setItem(keyName, JSON.stringify(action.payload));

           return {
            ...state,
            teams: [
                 ...state.teams.slice(0, index),
                action.payload,
                ...state.teams.slice(index + 1)
                ]
            };
        }

        case TeamsActionsList.CreateTeam: {
            localStorage.setItem(keyName, JSON.stringify(state.teams.concat(action.payload)));
            return {
                teams: state.teams.concat(action.payload)
            };
        }

        case TeamsActionsList.RemoveTeam: {
            const id = action.payload.team_id;
            const teams = state.teams;
            const index = currentIndex(teams, id);
            teams[index] = null;
            const updatedTeam = teams;
            localStorage.setItem(keyName, JSON.stringify(updatedTeam));
            return {
                teams: updatedTeam
            };

        }

        case TeamsActionsList.GetTeamsStorageSuccess: {
            return {
                ...state,
                teams: action.payload
            };
        }

        default:
            return state;
    }
}

function currentIndex(teams, id) {
    return teams.findIndex((team: { team_id: any; }) => {
        if (!team) {
            return false;
        }
        return team.team_id === id;
    } );
}

