import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, UserAdapter } from '../types/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private adapter: UserAdapter) {
  }

  private userApiUrl = environment.userApiUrl;

  getUsers(): Observable<User[]> {
    return this.http.get(`${this.userApiUrl}`).pipe(
      map((jsonData: any[]) => jsonData.map(jsonUser => this.adapter.adapt(jsonUser)))
    )
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get(`${this.userApiUrl}/${userId}`).pipe(
      map(jsonUser => this.adapter.adapt(jsonUser))
    )
  }

  getUserByEmail(userEmail: string): Observable<User> {
    return this.getUsers().pipe(
      map( (users: User[]) => 
        users.filter( (user: User) => user.email === userEmail )[0]
      ))
  };

  createUser(newUser: User): Observable<User> {
    return this.http.post(`${this.userApiUrl}`, this.createUserPayload(newUser)).pipe(
      map(jsonUser => this.adapter.adapt(jsonUser))
    );
  }

  updateUser(updatedUser: User): Observable<User> {
    return this.http.put(`${this.userApiUrl}/${updatedUser._id}`, this.createUserPayload(updatedUser))
      .pipe(map(jsonUser => this.adapter.adapt(jsonUser)))
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.userApiUrl}/${userId}`);
  }

  getUsersLike(searchString: string): Observable<User[]> {
    if (!searchString) {
      return of([]);
    }
    return this.http.get(`${this.userApiUrl}`).pipe(
      map(
        (jsonData: any[]) => jsonData.map(jsonUser => this.adapter.adapt(jsonUser))
          .filter(user => user.firstName.toLowerCase().includes(searchString.toLowerCase()))
      )
    )
  }

  private createUserPayload(user: User): any {
    const payload = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      guid: user.guid,
      address: user.address,
      phone: user.phone,
      email: user.email,
      roles: user.roles,
      status: user.status
    }
    return payload;
  }
}