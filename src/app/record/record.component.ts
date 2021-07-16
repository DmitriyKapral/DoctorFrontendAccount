import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../model/card';
import { Doctor } from '../model/doctor';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { FormControl, NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Patient } from '../model/patient';
import { Test_result } from '../model/test_result';
import { data } from 'jquery';
import { Symptoms } from '../model/symptoms';
import { from } from 'rxjs';

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
  toppings = new FormControl();
  test_result: Test_result[] = [];
  urlresult!: string;
  ssilka: boolean = false;
  checksymptom: boolean = false;
  symptoms: Symptoms[] = [];
  string!: any;
  a!: string;
  symptom: string[] = [];
  selectedSymptoms: string = "";
  recordSymptom: any;
  



  constructor(private http: HttpClient, private router: Router, activeRoute: ActivatedRoute, private dataservice: DataService, private jwtHelper: JwtHelperService) {this.idrecord = Number.parseInt(activeRoute.snapshot.params["idrecord"]); this.idPatient = Number.parseInt(activeRoute.snapshot.params["id"]);
}

  ngOnInit(): void {
    this.http.get("http://localhost:43053/api/home/Types").subscribe((data:any) => this.types = data);
    this.http.get("http://localhost:43053/api/home/Diagnose").subscribe((data:any) => this.diagnoses = data);
    this.http.get("http://localhost:43053/api/home/Symptoms").subscribe((data:any) => this.symptoms = data);
    this.http.get("http://localhost:43053/api/home/testResult/" + this.idrecord).subscribe((data:any) => {this.test_result = data; console.log(this.test_result)});
    if(this.idrecord)
    {
      this.ssilka = true;
      this.http.get("http://localhost:43053/api/home/GetRecord/" + this.idrecord).subscribe((data: any) => {this.card = data; 
      this.recordSymptom = this.card[0].symptom?.split(";");
      console.log(this.recordSymptom); this.toppings = new FormControl(this.recordSymptom);});
    }
    else
    {
    this.disabled = false;
    this.ssilka = false;
    this.http.get("http://localhost:43053/api/home/Doctor/").subscribe((data: any) => this.doctor = data);
    this.http.get("http://localhost:43053/api/home/" + this.idPatient).subscribe((data:any) => {this.patient = data;console.log(this.patient);});
    }
  }
  Record(form: NgForm)
  {
    this.symptom = this.toppings.value;
    for(let i=0; i<this.symptom.length; i++)
    {
      this.selectedSymptoms += this.symptom[i] + ";";
    }
    if(this.checksymptom)
    {
      this.selectedSymptoms = this.selectedSymptoms + form.value.symptom;
      
    }
    else
      this.selectedSymptoms = this.selectedSymptoms.substring(0, this.selectedSymptoms.length-1);
    console.log(this.selectedSymptoms);
    const credentials = {
      'fioPatient': form.value.fio,
      'dateTime': form.value.datetime,
      'fioDoctor': form.value.fiodoctor,
      'positionDoctor': form.value.position,
      'symptom': this.selectedSymptoms,
      'type': form.value.type,
      'diagnose': form.value.diagnose,
      'inspection_description': form.value.inspection,
      'textMedication': form.value.medication,
      'idPatient': this.idPatient
    }
    this.http.post("http://localhost:43053/api/home/Post", credentials)
    .subscribe()
    
    const test = {
      'name': form.value.test,
      'datetime': form.value.datetimetest,
      'idpatient': this.idPatient
    }
    if(this.checkTest)
    this.http.post("http://localhost:43053/api/home/AddTest", test).subscribe()
    
    const appointment = {
      'datetime': form.value.datetimenew,
      'idpatient': this.idPatient
    }
    console.log(appointment);
    if(this.checkData)
    this.http.post("http://localhost:43053/api/home/AddAppointment", appointment).subscribe()
    setTimeout(function(){
    }, 1000)
    this.router.navigateByUrl("patient/" + this.idPatient);
  }
  onChangeTest(value: any){
    this.urlresult = value;
    console.log(this.urlresult);

  }
  onChangeText(value: any){
    this.urlresult = value;
    


  }



}
