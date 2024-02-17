import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ScheduleDocument } from './model/schedule';
import { ScheduleService } from './schedule.service';
import { ScheduleUpdateDto } from './dto/schedule.uppdate.dto';
import { ScheduleDto } from './dto/schedule.dto';
import { DateScheduleDto } from './dto/date.schedule.dto';
import { RoomDocument } from 'src/room/model/room';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('/:date')
  @UsePipes(new ValidationPipe())
  async getSchedule(@Body() date: DateScheduleDto): Promise<RoomDocument> {
    try {
      if (!date) {
        throw new HttpException(
          'Date parameter is missing',
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.scheduleService.getScheduleRoom(date);
    } catch (error) {
      if (
        error instanceof HttpException &&
        error.getStatus() === HttpStatus.NOT_FOUND
      ) {
        throw error;
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/del')
  @UsePipes(new ValidationPipe())
  async deletSchadule(@Body() delDto: ScheduleDto): Promise<ScheduleDocument> {
    if (!delDto) {
      throw new HttpException('Date not exist', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.scheduleService.delSchedule(delDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put('/change')
  @UsePipes(new ValidationPipe())
  async changeSchedule(
    @Body() updateScheduleDto: ScheduleUpdateDto,
  ): Promise<void> {
    if (!updateScheduleDto) {
      throw new HttpException('Data not exist', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.scheduleService.updateSchedule(updateScheduleDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/new_schadule')
  @UsePipes(new ValidationPipe())
  async addSchedule(
    @Body() newSchedule: ScheduleDto,
  ): Promise<ScheduleDocument> {
    if (!newSchedule) {
      throw new HttpException('Schedule not found', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.scheduleService.addSchedule(newSchedule);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
