export class ScheduleDto {
  numberRoom: number;
  date: Date;
  relevanted: boolean;
  constructor() {
    this.relevanted = true;
  }
  setDate(newDate: Date) {
    this.date = newDate;
  }
}
