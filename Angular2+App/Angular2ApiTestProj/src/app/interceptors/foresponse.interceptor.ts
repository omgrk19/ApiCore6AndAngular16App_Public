import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ForesponseInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const startTime = (new Date()).getTime();

    return next.handle(request).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          const endTime = (new Date()).getTime();
          const diffSecond = (endTime - startTime) / 1000;
          console.log(event.url + ': execution time: ' + diffSecond + ' seconds.')
        }
        return event;
      })
    )


    return next.handle(request);
  }
}
