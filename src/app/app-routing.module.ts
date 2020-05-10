import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { HomeComponent } from './home/home.component';
import { ViewCarpoolsComponent } from './view-carpools/view-carpools.component';
import { ViewCarpoolDetailsComponent } from './view-carpool-details/view-carpool-details.component';
import { CreateCarpoolComponent } from './create-carpool/create-carpool.component';
import { ViewRidesComponent } from './view-rides/view-rides.component';

const routes: Routes = [
  { path: 'carpools', component: ViewCarpoolsComponent, pathMatch: 'full', ...canActivate(redirectUnauthorizedTo(['home'])) },
  { path: 'carpools/:id', component: ViewCarpoolDetailsComponent, ...canActivate(redirectUnauthorizedTo(['home'])) },
  { path: 'rides', component: ViewRidesComponent, ...canActivate(redirectUnauthorizedTo(['home'])) },
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
