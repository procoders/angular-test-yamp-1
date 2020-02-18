import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamItemComponent } from './team-item.component';

import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';

import { MatDialog  } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';

import { testObject } from './-moc-team-item.component.spec';

describe('TeamItemComponent', () => {
  let component: TeamItemComponent;
  let fixture: ComponentFixture<TeamItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamItemComponent ],
      imports: [MatDialogModule, StoreModule.forRoot({})],
      providers: [MatDialog, Overlay],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create team-item component', () => {
    expect(component).toBeTruthy();
  });

  it('should show test-name', () => {
    component.team = testObject;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h4').innerText).toEqual(testObject.name);
  });


});


