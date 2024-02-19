import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class DateScheduleDto {
  @Type(() => Date)
  @IsDate()
  date: Date;
}
