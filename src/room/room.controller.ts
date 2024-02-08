import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/room.dto';
import { Room, RoomDocument } from './model/room';
import { UpdateRoomDto } from './dto/room.update.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/:number_room')
  async getRoom(
    @Param('number_room', ParseIntPipe) number_room: number,
  ): Promise<Room> {
    try {
      const numberRoom = this.roomService.getRoom(number_room);
      if (!numberRoom) {
        throw new HttpException(
          `Room whith number ${number_room} not exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
      return numberRoom;
    } catch (error) {
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/del/:number_room')
  async deletRoom(
    @Param('number_room', ParseIntPipe) number_room: number,
  ): Promise<void> {
    try {
      await this.roomService.delRoom(number_room);
    } catch (error) {
      throw new HttpException(
        'Something went wrong...',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put('/change/:number')
  async changeRoom(
    @Param('number') number: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<void> {
    await this.roomService.updateRoom(number, updateRoomDto);
  }

  @Post('/new_room')
  async addRoom(@Body() roomDto: CreateRoomDto): Promise<RoomDocument> {
    try {
      return await this.roomService.addRoom(roomDto);
    } catch (error: any) {
      if (error.code === 11000) {
        throw new HttpException(
          'A room with that number already exists.',
          HttpStatus.CONFLICT,
        );
      } else {
        throw new InternalServerErrorException('An unexpected error occurred.');
      }
    }
  }
}
