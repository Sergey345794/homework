import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule, ScheduleDocument } from './model/schedule';
import { Model } from 'mongoose';
import { ScheduleDto } from './dto/schedule.dto';
import { ScheduleUpdateDto } from './dto/schedule.uppdate.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name)
    private readonly scheduleModel: Model<ScheduleDocument>,
  ) {}

  async getSchedule(date: Date): Promise<ScheduleDocument[]> {
    const schedule = await this.scheduleModel.find({ date }).exec();
    if (!schedule) {
      throw new HttpException('Schedule not found', HttpStatus.NOT_FOUND);
    }
    return schedule;
  }

  async addSchedule(newSchedule: ScheduleDto): Promise<void> {
    const numberRoom = newSchedule.numberRoom;
    const day = newSchedule.date;

    const schedule = await this.scheduleModel
      .findOne({ date: day })
      .populate({
        path: 'room',
        match: { numberRoom },
      })
      .exec();

    if (schedule) {
      throw new HttpException(
        `room number ${numberRoom} is reserved`,
        HttpStatus.CONFLICT,
      );
    }

    const scheduleModel = new this.scheduleModel(newSchedule);
    await scheduleModel.save();
  }

  async delSchedule(date: Date, numberRoom: string) {
    const schedule = await this.scheduleModel
      .findOne({ date })
      .populate({
        path: 'room',
        match: { numberRoom },
      })
      .exec();
    schedule.setRelevanted();

    await this.scheduleModel.create(schedule);
  }

  async updateSchedule(scheduleDto: ScheduleUpdateDto) {
    const date = scheduleDto.date;
    const schedule = await this.scheduleModel.findOne({ date }).exec();
    schedule.setRelevanted();
    await this.scheduleModel.create(scheduleDto);
  }
}
