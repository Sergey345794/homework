import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Schedule } from './schedule';
import { ScheduleService } from './schedule.service';
import { ScheduleUpdateDto } from './schedule.uppdate.dto';
import { ScheduleDto } from './schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('/:date')
  async getSchedule(@Param('date') date: Date): Promise<Schedule> {
    return this.scheduleService.getSchedule(date);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/del/:date')
  async deletSchadule(@Param('date') date: Date): Promise<void> {
    await this.scheduleService.delSchedule(date);
  }

  @HttpCode(HttpStatus.OK)
  @Put('/change')
  async changeSchedule(
    @Body() updateScheduleDto: ScheduleUpdateDto,
  ): Promise<void> {
    await this.scheduleService.updateSchedule(updateScheduleDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/new_schadule')
  async addSchedule(@Body() newSchedule: ScheduleDto) {
    await this.scheduleService.addSchedule(newSchedule);
  }
}
