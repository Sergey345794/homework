import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Room, RoomDocument } from './model/room';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/room.dto';
import { UpdateRoomDto } from './dto/room.update.dto';

export interface DeleteResult {
  acknowledged: boolean;
  deletedCount: number;
}

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
  ) {}

  async getRoom(number_room: number): Promise<RoomDocument> {
    const room = await this.roomModel
      .findOne({ numberRoom: number_room })
      .exec();
    if (!room) {
      throw new NotFoundException(
        `No room found with numberRoom: ${number_room}`,
      );
    }
    return room;
  }

  async addRoom(roomDto: CreateRoomDto): Promise<RoomDocument> {
    const newRoom = new this.roomModel(roomDto);
    await newRoom.save();
    return newRoom;
  }

  async delRoom(numberRoom: number): Promise<void> {
    const victim: DeleteResult = await this.roomModel.deleteOne({ numberRoom });
    if (victim.deletedCount === 0) {
      throw new NotFoundException(
        `No room found with numberRoom: ${numberRoom}`,
      );
    }
  }

  async updateRoom(
    numberRoom: number,
    updateRoomDto: UpdateRoomDto,
  ): Promise<RoomDocument> {
    const room = await this.roomModel
      .findOneAndUpdate({ numberRoom }, updateRoomDto, { new: true })
      .exec();
    if (!room) {
      throw new NotFoundException(
        `No room found with numberRoom: ${numberRoom}`,
      );
    }
    return room;
  }
}
