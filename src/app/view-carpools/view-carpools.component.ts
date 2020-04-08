import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarpool } from '../_shared/interfaces/_index';
import { User } from 'firebase';
import { ApiDatabaseService, AuthService } from '../_shared/services/_index';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-view-carpools',
  templateUrl: './view-carpools.component.html',
  styleUrls: ['./view-carpools.component.css']
})
export class ViewCarpoolsComponent implements OnInit {

  viewSelector: SelectItem[]; // enum for view switcher options
  selectedView = 'my-carpools'; // for holding the currently-selected view
  carpools$: Observable<ICarpool[]>;

  constructor(
    private authService: AuthService,
    private apiDatabaseService: ApiDatabaseService
  ) {
    // allows user to choose between seeing all vs just their carpools
    this.viewSelector = [
      {label: 'My Carpools', value: 'my-carpools'},
      {label: 'All Carpools', value: 'all-carpools'}
    ];
  }

  ngOnInit() {
    this.carpools$ = this.apiDatabaseService.indexCarpools();
  }

  onFilterChange() {
    console.log(this.selectedView);
  }

  onCarpoolJoin(carpool: ICarpool) {
    const user: User = this.authService.getLoggedInUserData();
    this.apiDatabaseService.addUserToCarpool(carpool.carpoolId, user.uid).subscribe(
      res => console.log(res)
    );
  }

}
