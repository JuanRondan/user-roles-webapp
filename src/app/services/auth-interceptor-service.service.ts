import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpSentEvent,
  HttpHandler,
  HttpResponse,
  HttpProgressEvent,
  HttpHeaderResponse,
  HttpUserEvent } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { IdamAuthenticationService } from '@pa-util/angular2-idam';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: IdamAuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        const clonedHeaders = req.headers.set('Authorization', this.authService.AuthHeaderValue);
        const clone = req.clone({headers: clonedHeaders});
        return next.handle(clone);
  }

}