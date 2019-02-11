import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { CamundaUser, CamundaUserAdapter } from '../types/camunda-user';
@Injectable({
  providedIn: 'root'
})
export class CamundaUserService {

  constructor( private http: HttpClient,
    private adapter: CamundaUserAdapter) { }

  private camundaUserApiUrl = environment.requestsApiUrl;
  private userApiUrl = environment.userApiUrl;

  // GET ALL THE CAMUNDA USER
  getCamundaUserRequests( ): Observable<CamundaUser[]> {
    return this.http.get(`${this.camundaUserApiUrl}/user/` ).pipe(
      map((rawData: any[]) => rawData.map( (rawRequest) => {
        const resData = rawRequest;
        resData.fullName = rawRequest.firstName + ' ' + rawRequest.lastName;
        return this.adapter.adapt(resData);
      }))
    );
  }

  // LIST OF ROLE ASSIGNED TO A USER
  camundaUserRoleList(userId: string): Observable<CamundaUser[]> {
    return this.http.get(`${this.userApiUrl}/camundaUserRole/${userId}` ).pipe(
      map((rawData: any[]) => rawData.map( (rawRequest) => rawRequest ))
    );
  }
  // CREATE CAMUNDA USER
  createCamundaUser( request: any): Observable<any> {
    console.log('create camunda user', request);
    return this.http.post(`${this.userApiUrl}/createCamundaUser`, request);
  }

  // UPDATE CAMUNDA USER
  updateCamundaUser( request: any): Observable<any> {
    console.log('update camunda user', request);
    return this.http.put(`${this.userApiUrl}/camunda/updateCamundaUser`, request);
  }

  // ASSINING PARTICULAR ROLE TO A USER
  camundaUserRoleAssignment( request: any): Observable<any> {
    console.log('update camunda user', request);
    return this.http.put(`${this.userApiUrl}/camunda/camundaUserRoleAssignment`, request);
  }
  // REMOVING  PARTICULAR ROLE FROM A USER
  camundaUserRoleRemoval(request: any): Observable<any> {
    return this.http.put(`${this.userApiUrl}/camunda/camundaUserRoleRemoval`, request);
  }
  // DELETE CAMUNDA USER
  deleteCamundaUser( request: string): Observable<any> {
    console.log('delete camunda user', request);
    return this.http.delete(`${this.userApiUrl}/camunda/${request}`);
  }
}
