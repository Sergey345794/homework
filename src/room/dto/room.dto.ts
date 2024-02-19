import { IsBoolean, IsEnum, IsNumber } from 'class-validator';
import { RoomType } from 'src/common/enums/room-type/room-type';

export class CreateRoomDto {
  @IsNumber()
  numberRoom: number;
  @IsEnum(RoomType)
  typeRoom: RoomType;
  @IsBoolean()
  seaView: boolean;
}
