import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamItemComponent } from './team-item.component';
import { TeamDialogComponent } from '../team-dialog/team-dialog.component';
import { By } from '@angular/platform-browser';

import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';

import { MatDialog  } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';

import { testObject } from './-moc-team-item.component';


class MdDialogMock {
  open() {}
}

describe('TeamItemComponent', () => {
  let component: TeamItemComponent;
  let fixture: ComponentFixture<TeamItemComponent>;
  let dialog;
  let debugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamItemComponent ],
      imports: [MatDialogModule, StoreModule.forRoot({})],
      providers: [ {provide: MatDialog, useClass: MdDialogMock}, Overlay],
    })
    .compileComponents().then( () => {
      fixture = TestBed.createComponent(TeamItemComponent);
      component = fixture.componentInstance;
      dialog = TestBed.inject(MatDialog);
      debugElement = fixture.debugElement;
      component.team = testObject;
      fixture.detectChanges();
    }
    );
  }));

  it('should create team-item component', () => {
    expect(component).toBeTruthy();
  });

  it('should show a edit dialog window ', () => {
    spyOn(dialog, 'open').and.callThrough();

    const editButton = debugElement.query(By.css('button[data-type=edit-btn]'));
    editButton.triggerEventHandler('click', null);

    expect(dialog.open).toHaveBeenCalledWith(TeamDialogComponent, {
      width: '400px',
      data: {
        team: testObject,
        type: 'edit',
      }

    });

  });

  it('should show a delete dialog window', () => {
    spyOn(dialog, 'open').and.callThrough();

    const editButton = debugElement.query(By.css('button[data-type=delete-btn]'));
    editButton.triggerEventHandler('click', null);

    expect(dialog.open).toHaveBeenCalledWith(TeamDialogComponent, {
      width: '400px',
      data: {
        team: testObject,
        type: 'delete',
      }

    });
  })




});


