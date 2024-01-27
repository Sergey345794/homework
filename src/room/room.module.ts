import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './room';
import { RoomService } from './room.service';
import { Schedule, ScheduleSchema } from 'src/schedule/schedule';
import { RoomController } from './room.controller';

@Module({
  providers: [RoomService],
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: Schedule.name, schema: ScheduleSchema },
    ]),
  ],
  controllers: [RoomController],
})
export class RoomModule {}
