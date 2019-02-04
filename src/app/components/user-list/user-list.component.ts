import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { AppUserRolesPaging } from '@pa-util/trident-rolemanagement/types/app-user-roles-paging';
import { AppRoles } from '@pa-util/trident-rolemanagement/types/app-roles';

import { User } from '../../types/user';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationAlertService } from '../../services/common-service/confirmation-alert.service';

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
  hideBackground: boolean;
  //users: AppUserRolesPaging;
  //roles: AppRoles;
  
  constructor(private userService: UserService,
    private _ConfirmationAlertService: ConfirmationAlertService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.users$ = this.userService.getUsers();
    //this.users = this.route.snapshot.data.resolvedUsers;
    //this.roles = this.route.snapshot.data.resolvedRoles;
  }

  createUser() {
    this.userToEdit = new User();
    this.hideBackground =  true;
  }

  editUser(user: User) {
    this.userToEdit = user;
    this.hideBackground = true;
  }

  updateUser(updatedUser: User) {
    if (updatedUser._id) {
      this.userService.updateUser(updatedUser).subscribe(user => updatedUser = user);
      this._ConfirmationAlertService.callToasterMsg('success', 'User updated succesfully');
    } else {
      this.userService.createUser(updatedUser).subscribe(newUser => {
        updatedUser = newUser;
        this.users$ = this.userService.getUsers();
        this._ConfirmationAlertService.callToasterMsg('success', 'User created succesfully');
      });
    }
  }

  confirmDelete(userId: string) {
    this.showModal = true;
    this.hideBackground = true;
    this.userToDelete = userId;
  }

  cancelDelete() {
    this.showModal = false;
    this.hideBackground = false;
  }

  deleteUser() {
    this.userService.deleteUser(this.userToDelete).subscribe(() => {
      this.users$ = this.userService.getUsers();
    });
  }

  closeUserDetails() {
    this.userToEdit = null;
    this.hideBackground = false;
  }

}
