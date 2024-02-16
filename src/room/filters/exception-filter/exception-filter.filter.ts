import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class InnerExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getResponse<Request>();
    const errorStatus = exception.getStatus();

      response
      .status(errorStatus)
      .json({
        statusCode: errorStatus,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      
  }
}
