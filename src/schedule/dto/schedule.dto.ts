import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class ScheduleDto {
  @IsNumber()
  numberRoom: number;
  @Type(() => Date)
  @IsDate()
  date: Date;
}
