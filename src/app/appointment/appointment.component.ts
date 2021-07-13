import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Patients } from '../model/patients';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  date!: string;
  vision: boolean = false;
  patients: Patients[] = [];
  isDate: boolean = false;


  constructor(private http: HttpClient, public datepipe: DatePipe, private _adapter: DateAdapter<any>) { }


  ngOnInit(): void {
      this._adapter.setLocale('ru');
  }
  onChangePatient(value: any)
  {
    value = this.datepipe.transform(value, 'yyyy-MM-dd')
    console.log(value);
    this.date = value;
    if(this.date)
    {
      this.http.get("http://localhost:43053/api/home/GetPatients/" + this.date).subscribe((data: any) => {this.patients = data; this.isDate=true; if(this.patients.length>0)
      {
        this.vision = true;
      }
      else
      {
        this.vision = false;
      }});
      
    }
  }

}
