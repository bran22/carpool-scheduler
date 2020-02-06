import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

import { HomeComponent } from './home/home.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { JoinCarpoolComponent } from './join-carpool/join-carpool.component';
import { MapboxComponent } from './mapbox/mapbox.component';

const routes: Routes = [
  { path: 'scheduler', component: SchedulerComponent },
  { path: 'join', component: JoinCarpoolComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'mapbox', component: MapboxComponent, canActivate: [AngularFireAuthGuard] },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AngularFireAuthGuard]
})
export class AppRoutingModule { }
