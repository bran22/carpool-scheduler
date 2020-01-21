import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { JoinCarpoolComponent } from './join-carpool/join-carpool.component';
import { MapboxComponent } from './mapbox/mapbox.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'scheduler', component: SchedulerComponent },
  { path: 'join', component: JoinCarpoolComponent },
  { path: 'mapbox', component: MapboxComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
