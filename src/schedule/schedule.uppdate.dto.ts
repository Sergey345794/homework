import { Room } from 'src/room/room';

export class ScheduleUpdateDto {
  room: Room;

  date: Date;

  relevanted: boolean;

  constructor() {
    this.relevanted = true;
  }
}
