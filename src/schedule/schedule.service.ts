import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule, ScheduleDocument } from './model/schedule';
import { Model, Types } from 'mongoose';
import { ScheduleDto } from './dto/schedule.dto';
import { ScheduleUpdateDto } from './dto/schedule.uppdate.dto';
import { Room, RoomDocument } from 'src/room/model/room';
import { DateScheduleDto } from './dto/date.schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name)
    private readonly scheduleModel: Model<ScheduleDocument>,
    @InjectModel(Room.name)
    private readonly roomModel: Model<RoomDocument>,
  ) {}

  async getScheduleRoom(date: DateScheduleDto): Promise<RoomDocument> {
    const schedule = await this.scheduleModel
      .findOne({ date: date.date })
      .exec();
    if (!schedule) {
      throw new HttpException('Schedule not found', HttpStatus.NOT_FOUND);
    }
    const roomReserved = await this.roomModel.findOne({ _id: schedule.room });
    if (!roomReserved) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }
    return roomReserved;
  }

  async addSchedule(newSchedule: ScheduleDto): Promise<ScheduleDocument> {
    const numberRoom = newSchedule.numberRoom;
    const day = newSchedule.date;
    const room: RoomDocument = await this.roomModel
      .findOne({ numberRoom: newSchedule.numberRoom })
      .exec();
    if (!room) {
      throw new NotFoundException(`Room with number ${numberRoom} not found.`);
    }

    await this.findExistingSchedule(numberRoom, room._id);

    const scheduleModel = new this.scheduleModel({
      ...newSchedule,
      relevanted: false,
      date: day,
      room: room._id,
    });

    await scheduleModel.save();
    return scheduleModel;
  }

  async delSchedule(delDto: ScheduleDto): Promise<ScheduleDocument> {
    const numberRoom = delDto.numberRoom;
    const room: RoomDocument = await this.roomModel
      .findOne({ numberRoom })
      .exec();
    if (!room) {
      throw new NotFoundException(
        `Room with number ${delDto.numberRoom} not found.`,
      );
    }

    const schedule = await this.scheduleModel
      .findOne({ room: room._id })
      .exec();

    if (schedule) {
      await this.scheduleModel.deleteOne({ _id: schedule.id });
      return schedule;
    } else {
      const notFoundedDate = delDto.date;
      throw new NotFoundException(
        `Schedule on date ${notFoundedDate} not found.`,
      );
    }
  }

  async updateSchedule(scheduleDto: ScheduleUpdateDto) {
    const date = scheduleDto.date;
    const schedule = await this.scheduleModel.findOneAndUpdate(
      {
        date: { $eq: date },
      },
      { ...scheduleDto, date: scheduleDto.newDate },
      { new: false },
    );
    if (!schedule) {
      console.error;
      throw new NotFoundException(`Schedule on date ${date} on exist.`);
    }
  }

  private async findExistingSchedule(numberRoom: number, id: Types.ObjectId) {
    const schedule = await this.scheduleModel.find({ room: id }).exec();
    if (schedule.length > 0) {
      throw new ConflictException(
        `room with id ${id} number ${numberRoom} on date ${schedule[0].date.toISOString()} is reserved`,
      );
    }
  }
}
