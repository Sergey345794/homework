import { Room } from 'src/room/model/room';

export class ScheduleUpdateDto {
  room: Room;

  date: Date;

  relevanted: boolean;

  constructor() {
    this.relevanted = true;
  }
}
