import { Injectable } from '@nestjs/common';
import { Room } from './room';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomDto } from './room.dto';
import { UpdateRoomDto } from './room.update.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
  ) {}

  async getRoom(numberRoom: number): Promise<Room> {
    return this.roomModel.findById({ numberRoom }).exec();
  }

  async addRoom(roomDto: RoomDto): Promise<void> {

    const newRoom = new this.roomModel(roomDto);
    newRoom.
    await newRoom.save();
  }

  async delRoom(numberRoom: number): Promise<void> {
    await this.roomModel.findByIdAndDelete({ numberRoom }).exec();
  }

  async updateRoom(
    numberRoom: number,
    updateRoomDto: UpdateRoomDto,
  ): Promise<void> {
    await this.roomModel
      .findOneAndUpdate({ numberRoom }, updateRoomDto, { new: true })
      .exec();
  }
}
