import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../model/card';
import { Doctor } from '../model/doctor';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Patient } from '../model/patient';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  types:any;
  diagnoses:any;
  card: Card[] = [];
  idrecord!: number;
  idPatient!: number;
  disabled:boolean = true;
  checkTest: boolean = false;
  checkData: boolean = false;
  doctor: Doctor[] = [];
  patient!: Patient;

  constructor(private http: HttpClient, private router: Router, activeRoute: ActivatedRoute, private dataservice: DataService, private jwtHelper: JwtHelperService) {this.idrecord = Number.parseInt(activeRoute.snapshot.params["idrecord"]); this.idPatient = Number.parseInt(activeRoute.snapshot.params["id"]);}

  ngOnInit(): void {
    const token: string|null = localStorage.getItem("jwt");
    console.log(token);
    this.http.get("http://localhost:43053/api/home/Types").subscribe((data:any) => this.types = data);
    this.http.get("http://localhost:43053/api/home/Diagnose").subscribe((data:any) => this.diagnoses = data);
    if(this.idrecord)
    this.http.get("http://localhost:43053/api/home/GetRecord/" + this.idrecord).subscribe((data: any) => this.card = data);
    else
    {
    this.disabled = false;
    this.http.get("http://localhost:43053/api/home/Doctor/").subscribe((data: any) => this.doctor = data);
    this.http.get("http://localhost:43053/api/home/" + this.idPatient).subscribe((data:any) => {this.patient = data;console.log(this.patient);});
    }
  }
  Record(form: NgForm)
  {
    const credentials = {
      'fioPatient': form.value.fio,
      'dateTime': form.value.datetime,
      'fioDoctor': form.value.fiodoctor,
      'positionDoctor': form.value.position,
      'symptom': form.value.symptoms,
      'type': form.value.type,
      'diagnose': form.value.diagnose,
      'inspection_description': form.value.inspection,
      'textMedication': form.value.medication,
      'idPatient': this.idPatient
    }
    this.http.post("http://localhost:43053/api/home/Post", credentials)
    .subscribe()
    const appointment = {
      'datetime': form.value.datetimenew,
      'idpatient': this.idPatient
    }
    if(this.checkData)
    this.http.post("http://localhost:43053/api/home/AddAppointment", appointment).subscribe()
    this.router.navigateByUrl("patient/" + this.idPatient);
  }

}
