import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { RoomType } from 'src/common/enums/room-type/room-type';
import { disconnect } from 'mongoose';
import { ScheduleDto } from 'src/schedule/dto/schedule.dto';

const testDto: ScheduleDto = {
  numberRoom: 101,
  date:  new Date(2024, 4, 17),
  relevanted: true
};

describe('Schedule controllers test (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/schedule/new_schadule (POST)', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/schedule/new_schadule')
      .send(testDto)
      .expect(200);

    expect(body.numberRoom).toEqual(101);
  });

  afterAll(() => {
    disconnect();
  });
});
