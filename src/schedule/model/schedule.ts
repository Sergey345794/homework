import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MonSchema } from 'mongoose';
import { Room } from 'src/room/model/room';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Schedule {
  @Prop({ type: MonSchema.Types.ObjectId, ref: Room.name })
  room: Room;

  @Prop({
    type: Date,
    set: (val: Date) => {
      return val
        ? new Date(val.getFullYear(), val.getMonth(), val.getDay())
        : val;
    },
    index: true,
    required: true,
  })
  date: Date;

  @Prop({ default: false })
  relevanted: boolean;

  public getRelevanted(): boolean {
    return this.relevanted;
  }

  public setRelevanted(): void {
    this.relevanted = !this.relevanted;
  }

  public setDate(newDate: Date) {
    this.date = newDate;
  }

  public setRoom(newRoom: Room) {
    this.room = newRoom;
  }
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
