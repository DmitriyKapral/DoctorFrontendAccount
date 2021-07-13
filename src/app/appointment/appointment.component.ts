import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  onChangePatient(value: any)
  {
    this.date = value;
    if(this.date)
    {
      this.vision = true;
      this.http.get("http://localhost:43053/api/home/GetPatients/" + this.date).subscribe((data: any) => this.patients = data);
    }
    else
    this.vision = false;
  }

}
