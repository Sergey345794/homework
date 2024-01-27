import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room } from 'src/room/room';
import { ScheduleSchema } from './schedule';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';

@Module({
	imports:[MongooseModule.forFeature([{name: Room.name, schema: ScheduleSchema}])],
	providers: [ScheduleService],
	controllers: [ScheduleController]
})
export class ScheduleModule {}
