// angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// backend stuff
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// 3rd party components
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// primeng components
import {MenubarModule} from 'primeng/menubar';

// authored components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { JoinCarpoolComponent } from './join-carpool/join-carpool.component';
import { MapboxComponent } from './mapbox/mapbox.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SchedulerComponent,
    TopNavComponent,
    JoinCarpoolComponent,
    MapboxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MenubarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
