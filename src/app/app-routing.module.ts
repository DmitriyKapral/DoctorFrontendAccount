import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { RecordComponent } from './record/record.component';
import { AuthGuard } from './guards/auth-guard.service';
import { AppointmentComponent } from './appointment/appointment.component';

const routes: Routes = [{ path: '', component: LoginComponent },
{ path: 'patient', component: PatientComponent },
{ path: 'patient/:id', component: PatientComponent },
{ path: 'patient/:id/record/:idrecord', component: RecordComponent},
{ path: 'patient/:id/record-add', component: RecordComponent, canActivate: [AuthGuard]},
{ path: 'appointment', component: AppointmentComponent, canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
