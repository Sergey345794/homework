import { Injectable } from '@nestjs/common';
import { Room, RoomDocument } from './model/room';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/room.dto';
import { UpdateRoomDto } from './dto/room.update.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
  ) {}

  async getRoom(number_room: number): Promise<RoomDocument> {
    return this.roomModel.findOne({ numberRoom: number_room }).exec();
  }

  async addRoom(roomDto: CreateRoomDto): Promise<RoomDocument> {
    const newRoom = new this.roomModel(roomDto);
    await newRoom.save();
    return newRoom;
  }

  async delRoom(numberRoom: number): Promise<void> {
    await this.roomModel.deleteOne({ numberRoom: numberRoom });
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
