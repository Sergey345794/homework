import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/room.dto';
import { Room, RoomDocument } from './model/room';
import { UpdateRoomDto } from './dto/room.update.dto';
import { InnerExceptionFilter } from './filters/exception-filter/exception-filter.filter';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/:number_room')
  async getRoom(
    @Param('number_room', ParseIntPipe) number_room: number,
  ): Promise<Room> {
    try {
      return this.roomService.getRoom(number_room);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        'Something went wrong...',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/del/:number_room')
  async deletRoom(
    @Param('number_room', ParseIntPipe) number_room: number,
  ): Promise<void> {
    try {
      await this.roomService.delRoom(number_room);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        'Something went wrong...',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put('/change/:number_room')
  @UsePipes(new ValidationPipe())
  async changeRoom(
    @Param('number_room', ParseIntPipe) number_room: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<RoomDocument> {
    try {
      return await this.roomService.updateRoom(number_room, updateRoomDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        'Something went wrong...',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/new_room')
  @UseFilters(new InnerExceptionFilter())
  @UsePipes(new ValidationPipe())
  async addRoom(@Body() roomDto: CreateRoomDto): Promise<RoomDocument> {
    try {
      return await this.roomService.addRoom(roomDto);
    } catch (error: any) {
      if (error.code === 11000) {
        throw new HttpException(
          'A room with that number already exists.',
          HttpStatus.CONFLICT,
        );
      }
      throw new InternalServerErrorException('An unexpected error occurred.');
    }
  }
}
