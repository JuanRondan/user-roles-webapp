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
    return this.http.post<any>(`${this.requestApiUrl}`, request);
  }

  getRequests( userId: string, userRole: string ): Observable<any[]> {
    return this.http.get<any>(`${this.requestApiUrl}/${userId}/roles/${userRole}` ).pipe(
      map((rawData: any[]) => rawData.map( rawRequest => this.adapter.adapt(rawRequest)))
    );
  }

  approveRequest( requestId: string): Observable<any> {
    return this.http.post<any>(`${this.requestApiUrl}/${requestId}`, {});
  }

  rejectRequest( requestId: string): Observable<any> {
    return this.http.post<any>(`${this.requestApiUrl}/${requestId}`, {});
  }

  private createRequestPayload(request: Request): any {
    const payload = {
        _id: request._id,
        name: request.name,
        description: request.description,
        instanceId: request.instanceId,
        status: request.status,
        creationDate: request.creationDate
    }
    return payload;
  }
}

