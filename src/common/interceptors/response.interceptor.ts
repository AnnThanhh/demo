import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response as ExpressResponse } from 'express';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T | null;
  responseTime: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const res = context.switchToHttp().getResponse<ExpressResponse>();
    const statusCode: number = res.statusCode;
    const now = Date.now();

    return next.handle().pipe(
      map(
        (data: T): Response<T> => ({
          statusCode: statusCode || 200,
          message: this.getMessage(statusCode),
          data: data ?? null,
          responseTime: `${Date.now() - now}ms`,
        }),
      ),
    );
  }

  private getMessage(statusCode: number): string {
    switch (statusCode) {
      case 201:
        return 'Created successfully';
      case 200:
        return 'Request successful';
      default:
        return 'Operation completed';
    }
  }
}
