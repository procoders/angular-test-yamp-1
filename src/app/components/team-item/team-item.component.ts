import { Component, Input } from '@angular/core';
import { Team } from '@models-app/team.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { RemoveTeam } from '@store-app/actions/teams.actions';
import { TeamDialogComponent } from '../team-dialog/team-dialog.component';
import { windowTypes } from '@services-app/teams.service';


@Component({
  selector: 'app-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.scss']
})
export class TeamItemComponent {

  @Input() team: Team;
  constructor(private dialog: MatDialog, private store: Store<Team[]>) { }

  editCourse(team: Team) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {team, type: windowTypes.edit};

    const dialogRef = this.dialog.open(TeamDialogComponent,
        {width: '400px', data: dialogConfig.data});


    dialogRef.afterClosed().subscribe(
        val => console.log('Dialog output:', val)
    );

  }

  /**
   * Opens a modal dialogue window for confirmation deletion
   *
   */
  deleteTeam(team) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = { team, type: windowTypes.delete};

    const dialogRef = this.dialog.open(TeamDialogComponent,
        {width: '400px', data: dialogConfig.data});


    dialogRef.afterClosed().subscribe(
        val => console.log('Dialog output:', val)
    );
  }

}
