import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule } from './schedule';
import { Model } from 'mongoose';
import { ScheduleDto } from './schedule.dto';
import { Room } from 'src/room/room';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name, Room.name)
    private readonly scheduleModel: Model<Schedule>,
    private readonly roomModel: Model<Room>,
  ) {}

  async getSchedule(date: Date): Promise<Schedule> {
    if (!date) {
      throw new HttpException(
        'Date parameter is missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const schedule = await this.scheduleModel.findOne({ date }).exec();
      if (!schedule) {
        throw new HttpException('Schedule not found', HttpStatus.NOT_FOUND);
      }
      return schedule;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addSchedule(newSchedule: ScheduleDto): Promise<void> {
    if (!newSchedule) {
      throw new HttpException('Schedule is exist', HttpStatus.BAD_REQUEST);
    }
    const number = newSchedule.numberRoom;
    if (!this.roomModel.findById({ number }).exec) {
      throw new HttpException(
        `room number ${number} is reserved`,
        HttpStatus.CONFLICT,
      );
    }
    try {
      const date = new Date(
        newSchedule.date.getFullYear(),
        newSchedule.date.getMonth(),
        newSchedule.date.getDay(),
      );
      newSchedule.setDate(date);

      this.scheduleModel.create(newSchedule);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
