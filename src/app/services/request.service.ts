import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Request, RequestAdapter } from '../types/Request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor( private http: HttpClient,
               private adapter: RequestAdapter) { }

  private requestApiUrl = environment.requestsApiUrl;

  initiateRequest( request: any): Observable<any> {
    console.log("initiating requst ", request);
    return this.http.post(`${this.requestApiUrl}`, this.createRequestPayload( request ));
  }

  getRequests( userEmail: string, userRole: string ): Observable<Request[]> {
    return this.http.get(`${this.requestApiUrl}/${userEmail}/roles/${userRole}` ).pipe(
      map((rawData: any[]) => rawData.map( rawRequest => this.adapter.adapt(rawRequest)))
    );
  }

  approveRequest( requestId: string): Observable<Request> {
    return this.http.post(`${this.requestApiUrl}/${requestId}/approve`, {}).pipe(
      map( request => this.adapter.adapt( request ))
    );
  }

  rejectRequest( requestId: string): Observable<Request> {
    return this.http.post(`${this.requestApiUrl}/${requestId}/reject`, {}).pipe(
      map( request => this.adapter.adapt( request ))
    );
  }

  private createRequestPayload(request: Request): any {
    const payload = {
        owner: request.owner,
        description: request.description,
        creationDate: request.creationDate
    };
    return payload;
  }
}

