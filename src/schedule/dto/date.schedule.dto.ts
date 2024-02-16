import { IsDate } from 'class-validator';

export class DateScheduleDto {
  @IsDate()
  date: Date;
}
