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

  async getRoom(numberRoom: number): Promise<RoomDocument> {
    return this.roomModel.findById(numberRoom).exec();
  }

  async addRoom(roomDto: CreateRoomDto): Promise<RoomDocument> {
    const newRoom = new this.roomModel(roomDto);
    console.log(newRoom);
    await newRoom.save();
    return newRoom;
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
