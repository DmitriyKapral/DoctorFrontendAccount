export class Patient {
    constructor(
      public id?: number,
      public name?: string,
      public surname?: string,
      public patronymic?: string,
      public gender?: string,
      public age?: number,
      public email?: string,
      public numberpolicy?: string,
      public numberpassport?: string,
      public phone?: string,
      public photourl?: string,
      public residenceaddress?: string,
      public placeofresidence?: string) { }
  }