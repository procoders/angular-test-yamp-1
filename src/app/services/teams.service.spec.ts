import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TeamService } from './teams.service';
import { teamsItem } from './-moc-teams.service';

describe('StudentsService', () => {
    let injector: TestBed;
    let service: TeamService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [TeamService],
      });

      injector = getTestBed();
      service = injector.get(TeamService);
      httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it(`should fetch teams as an Observable`, async(inject([HttpTestingController, TeamService],
        (httpClient: HttpTestingController, teamService: TeamService) => {

          teamService.getTeams()
            .subscribe((teams: any) => {
              expect(teams.length).toBe(4);
            });

          const req = httpMock.expectOne('https://api.opendota.com/api/teams');
          expect(req.request.method).toBe('GET');

          req.flush(teamsItem);
          httpMock.verify();

        })));
  });
