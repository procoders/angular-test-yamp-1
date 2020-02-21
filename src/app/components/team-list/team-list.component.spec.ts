import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamListComponent } from './team-list.component';
import { TeamDialogComponent } from '../team-dialog/team-dialog.component';
import { TeamState } from '@store-app/states/teams.states';
import { selectListTeam } from '@store-app/states/app.states';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, Store } from '@ngrx/store';

import { MatListModule } from '@angular/material/list';
import { MatDialog  } from '@angular/material/dialog';

import { AppState } from '@store-app/states/app.states';
import { TeamItemComponent } from '../team-item/team-item.component';
import { testObject, teamsList } from './-moc.team-list.component';
import { Team } from '@models-app/team.model';


class MdDialogMock {
  open() {}
}

describe('TeamListComponent', () => {
  let component: TeamListComponent;
  let fixture: ComponentFixture<TeamListComponent>;
  let dialog;
  let debugElement;
  const initialState = teamsList;
  let nativeElement;
  let store: MockStore<AppState>;
  let mockTeamSelector: MemoizedSelector<TeamState, Team[]>;


  @Component({selector: 'app-team-item', template: ''})
  class EventComponent {
    @Input() team: Team;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamListComponent, TeamItemComponent ],
      imports: [MatListModule],
      providers: [
        provideMockStore({initialState: teamsList}),
        {provide: MatDialog, useClass: MdDialogMock}],
    })
    .compileComponents().then( () => {
      fixture = TestBed.createComponent(TeamListComponent);
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      dialog = TestBed.inject(MatDialog);
      debugElement = fixture.debugElement;
      store = TestBed.get(Store);
      mockTeamSelector = store.overrideSelector(selectListTeam, teamsList );
      fixture.detectChanges();
    }
    );
  }));

  it('should create team-item component', () => {
    expect(component).toBeTruthy();
  });

  it('should show 2 elements when in store set 2 elements', () => {
    mockTeamSelector.setResult(teamsList);
    store.refreshState();
    fixture.detectChanges();
    expect(document.querySelectorAll('.mat-list-item.items').length).toBe(teamsList.length);
  });

  it('should show a new dialog window ', () => {
    spyOn(dialog, 'open').and.callThrough();

    const editButton = debugElement.query(By.css('button[data-type=create-btn]'));
    editButton.triggerEventHandler('click', null);

    expect(dialog.open).toHaveBeenCalledWith(TeamDialogComponent, {
      width: '400px',
      data: {
        team: testObject,
        type: 'new',
      }

    });

  });






});


