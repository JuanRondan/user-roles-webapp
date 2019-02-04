import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Role, RoleAdapter } from '../types/role';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor( private http: HttpClient,
               private adapter: RoleAdapter ) { 
  }

  private roleApiUrl = environment.roleApiUrl;

  getRoles(): Observable<Role[]> {
    return this.http.get( `${this.roleApiUrl}/camunda` ).pipe(
      map ( (jsonData: any[]) => jsonData.map( jsonRole =>
        this.adapter.adapt( jsonRole )
       ))
    );
  }

/*   getRole( roleId: string): Observable<Role> {
    return this.http.get( `${this.roleApiUrl}/${ roleId }` ).pipe(
      map( jsonRole => this.adapter.adapt( jsonRole ) )
    )
  } */
  
  createRole( newRole: Role ): Observable<any> {
    return this.http.post( `${this.roleApiUrl}/camunda`, this.createRolePayload( newRole ));
  }

  updateRole( updatedRole: Role): Observable<any> {
    return this.http.put( `${this.roleApiUrl}/camunda/${ updatedRole.id }` , this.createRolePayload( updatedRole ));  
  }

  deleteRole( roleId: string): Observable<any> {
    return this.http.delete(`${this.roleApiUrl}/camunda/${roleId}`);
  } 

  private createRolePayload( role: Role ): any {
    const payload = {
      id: role.id,
      name: role.name,
      type: role.description
    }
    return payload;
  }
}