import { Component, OnInit } from '@angular/core';
import { GetTeams, GetTeamsStorage } from './store/actions/teams.actions';
import { Store } from '@ngrx/store';
import { TeamState } from './store/states/teams.states';
import { keyName } from './services/teams.service';
import { LocalStorageService } from './services/local-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Teams Records';
  constructor(private store: Store<TeamState>, private localStorageService: LocalStorageService) {}

  ngOnInit() {
    if (!this.localStorageService.getSavedState(keyName)) {
      this.store.dispatch(new GetTeams());
    } else {
      this.store.dispatch(new GetTeamsStorage());
    }
  }
}
