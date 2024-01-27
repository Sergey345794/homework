export class ScheduleDto {
  numberRoom: number;
  date: Date;


  setDate(newDate: Date) {
      this.date = newDate;
  }
}
