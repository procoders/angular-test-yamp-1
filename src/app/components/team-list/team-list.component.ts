import { Component, OnInit } from '@angular/core';
import { Team } from '@models-app/team.model';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TeamDialogComponent } from '../team-dialog/team-dialog.component';
import { windowTypes } from '@services-app/teams.service';
import { AppState, selectListTeam } from '@store-app/states/app.states';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  teams: Observable<Team[]>;
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.teams = this.store.select(selectListTeam);
  }

  /**
   * Open a dialogue window with form for creating a new instance of Team record
   */
  createNew() {
    const dialogConfig = new MatDialogConfig();
    const team = new Team();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = { team, type: windowTypes.new};

    const dialogRef = this.dialog.open(TeamDialogComponent, {width: '400px', data: dialogConfig.data});

  }

}
