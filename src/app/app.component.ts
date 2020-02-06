import { Component, OnInit } from '@angular/core';
import { AuthService } from './_shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'carpool-scheduler';

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    // set up observable listener for any auth changes
    this.authService.subscribeToAuthChanges();
  }
}
