import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Schedule } from './model/schedule';
import { ScheduleService } from './schedule.service';
import { ScheduleUpdateDto } from './dto/schedule.uppdate.dto';
import { ScheduleDto } from './dto/schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('/:date')
  async getSchedule(@Param('date') date: Date): Promise<Schedule[]> {
    try {
      if (!date) {
        throw new HttpException(
          'Date parameter is missing',
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.scheduleService.getSchedule(date);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/del/:date/number_room:numberRoom')
  async deletSchadule(
    @Param('date') date: Date,
    @Param('numberRoom') numberRoom: string,
  ): Promise<void> {
    if (!date) {
      throw new HttpException('Date not exist', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.scheduleService.delSchedule(date, numberRoom);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put('/change')
  async changeSchedule(
    @Body() updateScheduleDto: ScheduleUpdateDto,
  ): Promise<void> {
    if (!updateScheduleDto) {
      throw new HttpException('Data not exist', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.scheduleService.updateSchedule(updateScheduleDto);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/new_schadule')
  async addSchedule(@Body() newSchedule: ScheduleDto) {
    if (!newSchedule) {
      throw new HttpException('Schedule is exist', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.scheduleService.addSchedule(newSchedule);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
