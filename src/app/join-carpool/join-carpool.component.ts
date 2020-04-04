import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarpool } from '../_shared/interfaces/carpool';
import { User } from 'firebase';
import { AuthService } from '../_shared/services/auth.service';
import { ApiDatabaseService } from '../_shared/services/api-database.service';

@Component({
  selector: 'app-join-carpool',
  templateUrl: './join-carpool.component.html',
  styleUrls: ['./join-carpool.component.css']
})
export class JoinCarpoolComponent implements OnInit {

  carpools$: Observable<ICarpool[]>;

  constructor(
    private authService: AuthService,
    private apiDatabaseService: ApiDatabaseService
  ) { }

  ngOnInit() {
    this.carpools$ = this.apiDatabaseService.getCarpools();
  }

  onCarpoolJoin(carpool: ICarpool) {
    console.log(carpool);
    const user: User = this.authService.getLoggedInUser();
  }

}
