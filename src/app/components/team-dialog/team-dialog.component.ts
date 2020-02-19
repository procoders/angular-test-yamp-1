import {Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Team } from '@models-app/team.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TeamState } from '@store-app/states/teams.states';
import { UpdateTeam, CreateTeam, RemoveTeam } from '@store-app/actions/teams.actions';
import { TeamService, windowTypes } from '@services-app/teams.service';

@Component({
    selector: 'app-team-dialog',
    templateUrl: './team-dialog.component.html',
    styleUrls: ['./team-dialog.component.scss']
})
export class TeamDialogComponent {

    form: FormGroup;
    name: string;
    team: Team;
    type: string;

    constructor(
        private fb: FormBuilder,
        private store: Store<TeamState>,
        private teamService: TeamService,
        private dialogRef: MatDialogRef<TeamDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data ) {
        const  {rating, name, wins} = data.team;
        this.name = name;
        this.team = data.team;
        this.type = data.type;
        this.form = fb.group({
          rating: [rating, Validators.required],
          name: [name, Validators.required],
          wins: [wins, Validators.required],
        });

    }
    /**
     * Handle a response of user from a modal dialog window.
     * It creates a new team record or updates an existed one depending of user actions.
     * Closes the modal window
     */
    save() {
        let payload = Object.assign({}, this.team, this.form.value);
        if (this.type === windowTypes.new) {
            const id = this.teamService.generateUI();
            payload = Object.assign({}, payload, {team_id: id});
            this.store.dispatch(new CreateTeam(payload));
        }

        if (this.type === windowTypes.edit) {
            this.store.dispatch(new UpdateTeam(payload));
        }

        this.dialogRef.close(this.form.value);
    }

    /**
     * Close the dialogue window
     */
    close() {
        this.dialogRef.close();
    }

    delete() {
        this.store.dispatch(new RemoveTeam(this.team));
        this.dialogRef.close(this.form.value);
    }

}
