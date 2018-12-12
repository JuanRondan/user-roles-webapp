import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

import { UserService } from '../../services/user.service';
import { User } from '../../types/user';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  usersFound$: Observable<any[]>;
  searchTerm = new Subject<string>();

  @Output() notifyUserSelected = new EventEmitter<User>();

  constructor( private userService: UserService ) { }

  ngOnInit() {
    this.usersFound$ = this.searchTerm.pipe(
      debounceTime( 300 ),
      distinctUntilChanged(),
      switchMap( (term: string) => this.userService.getUsersLike( term )),
      map( results => {
        results.sort( (a, b) => {
          return a.lastName !== b.lastName
            ? a.lastName < b.lastName ? -1 : 1
            : (a.firstName !== b.firstName
              ? a.firstName < b.firstName ? -1 : 1
              : 0
          );
        });
        return results;
      })
    );
  }

  onKeyPress( term: string ) {
    this.searchTerm.next( term );
  }
  
  onResultClick( user: User) {
    this.notifyUserSelected.emit( user );
  }

}
