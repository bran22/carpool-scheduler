// angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
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
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {FieldsetModule} from 'primeng/fieldset';

// authored components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { ViewCarpoolsComponent } from './view-carpools/view-carpools.component';
import { MapboxComponent } from './_shared/components/mapbox/mapbox.component';
import { CreateCarpoolComponent} from './create-carpool/create-carpool.component';
import { CarpoolCardComponent } from './_shared/components/carpool-card/carpool-card.component';
import { ViewCarpoolDetailsComponent } from './view-carpool-details/view-carpool-details.component';
import { RideCardComponent } from './_shared/components/ride-card/ride-card.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopNavComponent,
    ViewCarpoolsComponent,
    MapboxComponent,
    CreateCarpoolComponent,
    CarpoolCardComponent,
    ViewCarpoolDetailsComponent,
    RideCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MenubarModule,
    InputTextModule,
    CheckboxModule,
    CalendarModule,
    ButtonModule,
    CardModule,
    OverlayPanelModule,
    ToastModule,
    SelectButtonModule,
    ProgressSpinnerModule,
    FieldsetModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
