import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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
    return this.http.get( `${this.roleApiUrl}` ).pipe(
      map ( (jsonData: any[]) => jsonData.map( jsonRole => this.adapter.adapt( jsonRole ) ))
    )
  }

  getRole( roleId: string): Observable<Role> {
    return this.http.get( `${this.roleApiUrl}/${ roleId }` ).pipe(
      map( jsonRole => this.adapter.adapt( jsonRole ) )
    )
  }
  
  createRole( newRole: Role ): Observable<Role> {
    return this.http.post( `${this.roleApiUrl}`, this.createRolePayload( newRole ) ).pipe(
      map( jsonRole => this.adapter.adapt(jsonRole))
    );
  }

  updateRole( updatedRole: Role): Observable<Role> {
    return this.http.put( `${this.roleApiUrl}/${ updatedRole._id }` , this.createRolePayload( updatedRole ))
      .pipe( map( jsonRole => this.adapter.adapt( jsonRole )))
  }

  deleteRole( roleId: string): Observable<any> {
    return this.http.delete(`${this.roleApiUrl}/${roleId}`);
  } 

  private createRolePayload( role: Role ): any {
    const payload = {
      _id: role._id,
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    }
    return payload;
  }
}

export const mockRoles = [
  {
    _id: "1",
    name: "God",
    description: "can do anything, can delete admin",
  },
  {
    _id: "2",
    name: "Admin",
    description: "can do anything except removing god",
  },
  {
    _id: "3",
    name: "Developer",
    description: "can do anything, even hacking god",
  },
  {
    _id: "4",
    name: "User",
    description: "serves to the rest of the roles",
  },
];