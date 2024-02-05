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
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/room.dto';
import { Room, RoomDocument } from './model/room';
import { UpdateRoomDto } from './dto/room.update.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/:number')
  async getRoom(@Param('number') number: number): Promise<Room> {
    return this.roomService.getRoom(number);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/del/:number')
  async deletRoom(@Param('number') number: number): Promise<void> {
    await this.roomService.delRoom(number);
  }

  @HttpCode(HttpStatus.OK)
  @Put('/change/:number')
  async changeRoom(
    @Param('number') number: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<void> {
    await this.roomService.updateRoom(number, updateRoomDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/new_room')
  async addRoom(@Body() roomDto: CreateRoomDto): Promise<RoomDocument> {
    console.log(roomDto);

    return await this.roomService.addRoom(roomDto);
  }
}
