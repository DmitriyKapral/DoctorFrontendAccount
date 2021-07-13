import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private data!: number;

  setData(data: any){
    this.data = data;
  }

  getData(){
    let temp = this.data;
    return temp;
  }
}
