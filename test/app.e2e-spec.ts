import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateRoomDto } from 'src/room/dto/room.dto';
import { RoomType } from 'src/common/enums/room-type/room-type';
import { disconnect } from 'mongoose';

const testDto: CreateRoomDto = {
  numberRoom: 101,
  typeRoom: RoomType.STANDARD,
  seaView: false,
};

describe('Room and schedule controllers test (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/room/new_room (POST)', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/room/new_room')
      .send(testDto)
      .expect(200);

    expect(body.numberRoom).toEqual(101);
  });

  afterAll(() => {
    disconnect();
  });
});
