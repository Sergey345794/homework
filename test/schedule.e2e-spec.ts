import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { ScheduleDto } from 'src/schedule/dto/schedule.dto';

const testDto: ScheduleDto = {
  numberRoom: 201,
  date: new Date(2024, 4, 17),
  relevanted: true,
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

  it('/schedule/new_schadule (POST) negotiv', () => {
    request(app.getHttpServer())
      .post('/schedule/new_schadule')
      .send({ ...testDto, numberRoom: 5 })
      .expect(409);
  });

  it('/schedule/new_schadule (POST) positive', () => {
    request(app.getHttpServer())
      .post('/schedule/new_schadule')
      .send(testDto)
      .expect(200);
  });

  afterAll(() => {
    disconnect();
  });
});
