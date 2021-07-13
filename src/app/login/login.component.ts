import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms'; 

import { from } from 'rxjs';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin!: boolean;

  constructor(private route: Router, private http: HttpClient) {}

  login(form: NgForm) {
    const credentials = {
      'email': form.value.email,
      'password': form.value.password
    }
    this.http.post("http://localhost:43053/api/home/auth", credentials)
    .subscribe(response => {
      const token = (<any>response).token;
      this.invalidLogin = false;
      localStorage.setItem("jwt", token);
      this.route.navigate(["appointment"]);
      console.log(token);
    }, err => {
      this.invalidLogin = true;
    })
  }
}
