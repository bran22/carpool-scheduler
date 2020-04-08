import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, canActivate, loggedIn, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { HomeComponent } from './home/home.component';
import { ViewCarpoolsComponent } from './view-carpools/view-carpools.component';
import { MapboxComponent } from './mapbox/mapbox.component';
import { CreateCarpoolComponent } from './create-carpool/create-carpool.component';

const routes: Routes = [
  { path: 'view', component: ViewCarpoolsComponent, ...canActivate(redirectUnauthorizedTo(['home'])) },
  { path: 'mapbox', component: MapboxComponent, ...canActivate(redirectUnauthorizedTo(['home'])) },
  { path: 'create', component: CreateCarpoolComponent, ...canActivate(redirectUnauthorizedTo(['home'])) },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AngularFireAuthGuard]
})
export class AppRoutingModule { }
