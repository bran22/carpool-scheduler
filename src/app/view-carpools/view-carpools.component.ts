import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarpool } from '../_shared/interfaces/_index';
import { User } from 'firebase';
import { ApiDatabaseService, AuthService } from '../_shared/services/_index';
import {SelectItem, MessageService} from 'primeng/api';

@Component({
  selector: 'app-view-carpools',
  templateUrl: './view-carpools.component.html',
  styleUrls: ['./view-carpools.component.css']
})
export class ViewCarpoolsComponent implements OnInit {

  viewSelector: SelectItem[]; // enum for view switcher options
  selectedView: 'my-carpools' | 'all-carpools'; // for holding the currently-selected view
  carpools$: Observable<ICarpool[]>;  // for holding the carpools to be displayed to the user

  constructor(
    private authService: AuthService,
    private apiDatabaseService: ApiDatabaseService,
    private messageService: MessageService,
  ) {
    // allows user to choose between seeing all vs just their carpools
    this.viewSelector = [
      {label: 'My Carpools', value: 'my-carpools'},
      {label: 'All Carpools', value: 'all-carpools'}
    ];
  }

  ngOnInit() {
    this.selectedView = 'my-carpools';
    this.carpools$ = this.getCarpools(this.selectedView);
  }

  getCarpools(selectedView: string) {
    const user: User = this.authService.getLoggedInUserData();

    if (selectedView === 'my-carpools') {
      return this.apiDatabaseService.showCarpoolsWithParticipant(user.uid);
    } else if (selectedView === 'all-carpools') {
      return this.apiDatabaseService.indexCarpools();
    }
  }

  onFilterChange() {
    // when switcher is clicked, update carpools
    this.carpools$ = this.getCarpools(this.selectedView);
  }

  onCarpoolJoin(carpool: ICarpool) {
    const user: User = this.authService.getLoggedInUserData();
    this.apiDatabaseService.addUserToCarpool(carpool.carpoolId, user.uid).subscribe(
      res => {
      // after successful join, raise toast
      this.messageService.add({severity: 'success', summary: 'Joined Carpool', detail: `You have joined ${carpool.carpoolName}`});
      },
      err => {
        // if join fails, throw error
        console.log(err);
        this.messageService.add({severity: 'error', summary: 'Joined Failed', detail: `Failed to join ${carpool.carpoolName}`});
      }
    );
  }

}
