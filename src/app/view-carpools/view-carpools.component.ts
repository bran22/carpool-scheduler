import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarpool } from '../_shared/interfaces/_index';
import { User } from 'firebase';
import { ApiDatabaseService, AuthService } from '../_shared/services/_index';

@Component({
  selector: 'app-view-carpools',
  templateUrl: './view-carpools.component.html',
  styleUrls: ['./view-carpools.component.css']
})
export class ViewCarpoolsComponent implements OnInit {

  carpools$: Observable<ICarpool[]>;

  constructor(
    private authService: AuthService,
    private apiDatabaseService: ApiDatabaseService
  ) { }

  ngOnInit() {
    this.carpools$ = this.apiDatabaseService.indexCarpools();
  }

  onCarpoolJoin(carpool: ICarpool) {
    const user: User = this.authService.getLoggedInUserData();
    this.apiDatabaseService.addUserToCarpool(carpool.carpoolId, user.uid).subscribe(
      res => console.log(res)
    );
  }

}
