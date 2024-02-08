import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateRoomDto } from 'src/room/dto/room.dto';
import { RoomType } from 'src/common/enums/room-type/room-type';
import { disconnect } from 'mongoose';

const testDto: CreateRoomDto = {
  numberRoom: 101,
  typeRoom: RoomType.STANDARD,
  seaView: false,
};

const number_room: number = 101;

describe('Room and schedule controllers test (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/room/new_room (POST) positive', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/room/new_room')
      .send(testDto)
      .expect(201);

    expect(body.numberRoom).toEqual(101);
  });

  it('/room/new_room (POST) negotive', async () => {
    await request(app.getHttpServer())
      .post('/room/new_room')
      .send(testDto)
      .expect(409);
  });

  it('/room/:number_room (GET) positive ', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/room/${number_room}`)
      .expect(200);

    expect(body.numberRoom).toEqual(101);
  });

  it('/room/:number_room (GET) negotive ', async () => {
    const numberRoom: number = 301;
    await request(app.getHttpServer()).get(`/room/${numberRoom}`).expect(200);
  });

  it('/room/del/:number_room (DELET) positive', async () => {
    await request(app.getHttpServer())
      .delete(`/room/del/${number_room}`)
      .expect(200);
  });

  afterAll(() => {
    disconnect();
  });
});
