import { RoomType } from 'src/common/enums/room-type/room-type';

export class CreateRoomDto {
  numberRoom: number;
  typeRoom: RoomType;
  seaView: boolean;
}
