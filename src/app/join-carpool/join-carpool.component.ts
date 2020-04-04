import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICarpool } from '../_shared/interfaces/carpool';
import { User } from 'firebase';
import { AuthService } from '../_shared/services/auth.service';

@Component({
  selector: 'app-join-carpool',
  templateUrl: './join-carpool.component.html',
  styleUrls: ['./join-carpool.component.css']
})
export class JoinCarpoolComponent implements OnInit {

  carpools$: Observable<ICarpool[]>;

  constructor(
    private db: AngularFirestore,
    private authService: AuthService
  ) {
    this.carpools$ = db.collection<ICarpool>('carpools').valueChanges();
  }

  ngOnInit() {
  }

  onCarpoolJoin(carpool: ICarpool) {
    console.log(carpool);
    const user: User = this.authService.getLoggedInUser();
  }

}
