import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from './schedule';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { Room, RoomSchema } from 'src/room/room';

@Module({
  providers: [ScheduleService],
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: Schedule.name, schema: ScheduleSchema },
    ]),
  ],
  controllers: [ScheduleController],
})
export class ScheduleModule {}
