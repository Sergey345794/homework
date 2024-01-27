import { RoomType } from 'src/common/enums/room-type/room-type';


export class UpdateRoomDto {
  typeRoom: RoomType;
  seaView: boolean;
}