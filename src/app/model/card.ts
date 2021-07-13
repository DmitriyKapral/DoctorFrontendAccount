export class Card {
    constructor(
      public id?: number,
      public fioPatient?: string,
      public dateTime?: string,
      public fioDoctor?: string,
      public positionDoctor?: string,
      public symptom?: string,
      public type?: string,
      public diagnose?: string,
      public inspection_description?: string,
      public textMedication?: string,
      public idPatient?: number
      ) { }
  }
  