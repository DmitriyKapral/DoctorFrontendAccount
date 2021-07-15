import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '../model/patient';
import { Cards } from '../model/cards';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  id!: number;
  i: string | undefined;
  string: any;
  enable: boolean = false;
  public searchString!: string;

  patient!: Patient;
  cards: Cards[] = [];
  
  constructor(private http: HttpClient, private dataservice:DataService, activeRoute: ActivatedRoute, private router: Router) {this.id = Number.parseInt(activeRoute.snapshot.params["id"]);}

  ngOnInit(): void {
    
    this.http.get("http://localhost:43053/api/home/GetHistory/" + this.id).subscribe((data: any ) => {this.cards = data;console.log(this.cards);});
    this.http.get("http://localhost:43053/api/home/" + this.id).subscribe((data:any) => {this.patient = data; this.enable=true});
  }
  search(form: NgForm)
  {
    const credentials = {
      'fio': form.value.fio,
      'numberpolicy': form.value.numberpolicy
    }

    this.http.post("http://localhost:43053/api/home/SearchPatient", credentials).subscribe((data: any) => {this.patient = data; this.getTable();});
    

  }
  getTable(){
    this.http.get("http://localhost:43053/api/home/GetHistory/" + this.patient.id).subscribe((data: any) => {this.cards = data;console.log(this.cards);this.enable= true;console.log(this.patient);});

    this.router.navigateByUrl("patient/" + this.patient.id);
  }

}
