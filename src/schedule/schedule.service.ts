import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule } from './schedule';
import { Model } from 'mongoose';
import { ScheduleDto } from './schedule.dto';
import { Room } from 'src/room/room';
import { ScheduleUpdateDto } from './schedule.uppdate.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name) private readonly scheduleModel: Model<Schedule>,
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
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
    try {
      const room = await this.roomModel.findById({ number }).exec();
      const schedule = await this.scheduleModel.findOne({ number }).exec();

      if (!room && !schedule.getRelevanted()) {
        throw new HttpException(
          `room number ${number} is reserved`,
          HttpStatus.CONFLICT,
        );
      }
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

  async delSchedule(date: Date) {
    if (!date) {
      throw new HttpException('Date not exist', HttpStatus.BAD_REQUEST);
    }
    const schedule = await this.scheduleModel.findOne({ date }).exec();
    schedule.setRelevanted();
    try {
      await this.scheduleModel.create(schedule);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateSchedule(scheduleDto: ScheduleUpdateDto) {
    if (!scheduleDto) {
      throw new HttpException('Data not exist', HttpStatus.BAD_REQUEST);
    }
    try {
      const date = scheduleDto.date;
      const schedule = await this.scheduleModel.findOne({ date }).exec();
      schedule.setRelevanted();
      await this.scheduleModel.create(scheduleDto);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
