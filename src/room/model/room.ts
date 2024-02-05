import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RoomType } from 'src/common/enums/room-type/room-type';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop({ required: true, unique: true, index: true })
  numberRoom: number;

  @Prop({ type: String, enum: RoomType })
  typeRoom: RoomType;

  @Prop({ default: false })
  seaView: boolean;

  print() {
    console.log(
      `numberRoom = ${this.numberRoom}, typeRoom = ${this.typeRoom} seaView = ${this.seaView}`,
    );
  }
}

export const RoomSchema = SchemaFactory.createForClass(Room);
