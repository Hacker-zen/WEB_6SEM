import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // mark the moment starting process request of server
    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        // get response
        const response = context.switchToHttp().getResponse();

        // mark the moment ending process request of server
        const end = Date.now();

        // get the total processed time
        const duration = end - start;

        // put processing time (duration) in response
        response.locals.processed_time = duration;
      }),
    );
  }
}
