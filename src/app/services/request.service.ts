import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor( private http: HttpClient) { }

  private requestApiUrl = environment.requestsApiUrl;

  initiateRequest( request: any): Observable<any> {
    return this.http.post<any>(`${this.requestApiUrl}`, request);
  }

  getRequests( userId: string, userRole: string ): Observable<any[]> {
    return this.http.get<any>(`${this.requestApiUrl}/${userId}/roles/${userRole}` );
  }

  approveRequest( requestId: string): Observable<any> {
    return this.http.post<any>(`${this.requestApiUrl}/${requestId}`, {});
  }

  rejectRequest( requestId: string): Observable<any> {
    return this.http.post<any>(`${this.requestApiUrl}/${requestId}`, {});
  }
}

