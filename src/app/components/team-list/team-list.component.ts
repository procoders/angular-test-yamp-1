import { Component, OnInit, Input } from '@angular/core';
import { Team } from '@models-app/team.model';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TeamDialogComponent } from '../team-dialog/team-dialog.component';
import { TeamService, windowTypes } from '@services-app/teams.service';
@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  teams: Team[];
  teamsNew: any[];
  constructor(
    private store: Store<Team[]>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.store.select('listOfTeams').subscribe( data => {
      if (data.teams.length > 0) {
        this.teams = data.teams;
      }
    });
  }

  createNew() {
    const dialogConfig = new MatDialogConfig();
    const team = new Team();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = { team, type: windowTypes.new};

    const dialogRef = this.dialog.open(TeamDialogComponent,
        {width: '400px', data: dialogConfig.data});


    dialogRef.afterClosed().subscribe(
        val => console.log('Dialog output:', val)
    );

  }

}
