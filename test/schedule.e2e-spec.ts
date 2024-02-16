import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { ScheduleDto } from 'src/schedule/dto/schedule.dto';
import { DateScheduleDto } from 'src/schedule/dto/date.schedule.dto';
import { ScheduleUpdateDto } from 'src/schedule/dto/schedule.uppdate.dto';

const testDto: ScheduleDto = {
  numberRoom: 201,
  date: new Date(2024, 4, 17),
};
const dateDto: DateScheduleDto = {
  date: new Date(2024, 4, 17),
};
const scheduleUpdateDto: ScheduleUpdateDto = {
  numberRoom: 201,
  date: new Date(2024, 4, 17),
  relevanted: true,
  newDate: new Date(2024, 4, 18),
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

  it('/schedule/new_schadule (POST) positive', async () => {
    let testDate = new Date(2024, 4, 17);
    const { body } = await request(app.getHttpServer())
      .post('/schedule/new_schadule')
      .send(testDto)
      .expect(200);

    expect(body.date).toEqual(testDate.toISOString());
  });

  it('/schedule/new_schadule (POST) negotive', async () => {
    await request(app.getHttpServer())
      .post('/schedule/new_schadule')
      .send(testDto)
      .expect(409);
  });

  it('/schedule/date (GET) positive', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/schedule/date`)
      .send(dateDto);
    expect(body.numberRoom).toEqual(testDto.numberRoom);
  });
  it('/schedule/date (GET) negotive', async () => {
    const notValid = new Date(2024, 5, 20);
    await request(app.getHttpServer())
      .get(`/schedule/date`)
      .send({ ...dateDto, date: notValid })
      .expect(404);
  });

  it('/schedule/change (UPDATE) positive', async () => {
    await request(app.getHttpServer())
      .put(`/schedule/change`)
      .send(scheduleUpdateDto)
      .expect(200);
  });
  it('/schedule/change (UPDATE) negotive', async () => {
    await request(app.getHttpServer())
      .put(`/schedule/change`)
      .send(scheduleUpdateDto)
      .expect(404);
  });

  //DELETE /////////////////////////////////////////////
  it('/schedule/del (DEL) positive', async () => {
    const { body } = await request(app.getHttpServer())
      .delete(`/schedule/del`)
      .send({ ...testDto, date: scheduleUpdateDto.newDate })
      .expect(200);

    expect(body.date).toEqual(scheduleUpdateDto.newDate.toISOString());
  });

  it('/schedule/del (DEL) negotive', async () => {
    await request(app.getHttpServer())
      .delete(`/schedule/del`)
      .send(testDto)
      .expect(404);
  });

  afterAll(() => {
    disconnect();
  });
});
