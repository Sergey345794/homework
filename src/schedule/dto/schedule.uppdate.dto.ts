import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber } from 'class-validator';

export class ScheduleUpdateDto {
  @IsNumber()
  numberRoom: number;
  @Type(() => Date)
  @IsDate()
  date: Date;
  @Type(() => Date)
  @IsDate()
  newDate: Date;
  @IsBoolean()
  relevanted: boolean;

  constructor() {
    this.relevanted = true;
  }
}
