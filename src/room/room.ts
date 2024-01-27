import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RoomType } from 'src/common/enums/room-type/room-type';

export type RoomDocument = HydratedDocument<Room>;

Schema();
export class Room {
  @Prop({ required: true, unique: true, index: true })
  numberRoom: number;

  @Prop({ type: String, enum: RoomType })
  typeRoom: RoomType;

  @Prop(Boolean)
  seaView: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
RoomSchema.set('autoIndex', false);
RoomSchema.set('_id', false);
