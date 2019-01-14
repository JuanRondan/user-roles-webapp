import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { AppUserRolesPaging } from '@pa-util/trident-rolemanagement/types/app-user-roles-paging';
import { AppRoles } from '@pa-util/trident-rolemanagement/types/app-roles';

import { User } from '../../types/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]>;
  userToEdit: User;
  showModal: boolean;
  userToDelete: string;
  
  users: AppUserRolesPaging;
  roles: AppRoles;
  
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.users$ = this.userService.getUsers();
    this.users = this.route.snapshot.data.resolvedUsers;
    this.roles = this.route.snapshot.data.resolvedRoles;
  }

  createUser() {
    this.userToEdit = new User();
  }

  editUser(user: User) {
    this.userToEdit = user;
  }

  updateUser(updatedUser: User) {
    if (updatedUser._id) {
      this.userService.updateUser(updatedUser).subscribe(user => updatedUser = user);
    } else {
      this.userService.createUser(updatedUser).subscribe(newUser => {
        updatedUser = newUser;
        this.users$ = this.userService.getUsers();
      });
    }
  }

  confirmDelete(userId: string) {
    this.showModal = true;
    this.userToDelete = userId;
  }

  cancelDelete() {
    this.showModal = false;
  }

  deleteUser() {
    this.userService.deleteUser(this.userToDelete).subscribe(() => {
      this.users$ = this.userService.getUsers();
    });
  }

  closeUserDetails() {
    this.userToEdit = null;
  }

}
