import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import {MatIconModule} from '@angular/material/icon'

import { DataService } from './data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { NavComponent } from './nav/nav.component';
import { RecordComponent } from './record/record.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { enableProdMode } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DemoMaterialModule } from './material-module';
import { DatePipe } from '@angular/common';



export function tokenGetter()
{
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PatientComponent,
    NavComponent,
    RecordComponent,
    AppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:43053"],
        disallowedRoutes: []
      }
    }),
    BrowserAnimationsModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  
  providers: [DataService, DatePipe],
  bootstrap: [AppComponent, AppointmentComponent],
  entryComponents: [AppointmentComponent]
})
export class AppModule { }
