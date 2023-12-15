import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';

export class ResponseInterceptor implements NestInterceptor {
  private reflector = new Reflector();
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('===reflector interceptor===', this.reflector);

    return next.handle().pipe(
      map((data) => {
        return {
          status_code: context.switchToHttp().getResponse().statusCode,
          data: data,
          error: null,
        };
      }),
    );
  }
}
