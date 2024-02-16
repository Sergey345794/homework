import { IsBoolean, IsEnum } from 'class-validator';
import { RoomType } from 'src/common/enums/room-type/room-type';

export class UpdateRoomDto {
  @IsEnum(RoomType)
  typeRoom: RoomType;
  @IsBoolean()
  seaView: boolean;
}
