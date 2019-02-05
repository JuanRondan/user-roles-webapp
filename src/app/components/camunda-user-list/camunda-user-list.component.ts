import { Component, OnInit } from '@angular/core';
import { CamundaUserService } from '../../services/camunda-user.service';
import { Observable } from 'rxjs';
import { AppUserRolesPaging } from '@pa-util/trident-rolemanagement/types/app-user-roles-paging';
import { AppRoles } from '@pa-util/trident-rolemanagement/types/app-roles';

import { CamundaUser } from '../../types/camunda-user';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationAlertService } from '../../services/common-service/confirmation-alert.service';

@Component({
  selector: 'app-camunda-user-list',
  templateUrl: './camunda-user-list.component.html',
  styleUrls: ['./camunda-user-list.component.css']
})
export class CamundaUserListComponent implements OnInit {

  users$: Observable<CamundaUser[]>;
  showModal: boolean;
  userToDelete: string;
  hideBackground: boolean;
  requestToAddEdit: CamundaUser;
  formAdd: boolean;
  //users: AppUserRolesPaging;
  //roles: AppRoles;
  
  constructor(private camundaUserService: CamundaUserService,
    private _ConfirmationAlertService: ConfirmationAlertService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.users$ = this.camundaUserService.getCamundaUserRequests();
    this.formAdd = true;
    //this.users = this.route.snapshot.data.resolvedUsers;
    //this.roles = this.route.snapshot.data.resolvedRoles;
  }

  createUser() {
    this.requestToAddEdit = new CamundaUser();
    this.hideBackground =  true;
  }

  editUser(userData: CamundaUser) {
    this.requestToAddEdit = userData;
    this.formAdd = false;
    this.hideBackground = true;
  }

  createCamundaUser(updatedUser: CamundaUser) {
    if (updatedUser._id) {
      this.camundaUserService.updateCamundaUser(updatedUser).subscribe();
      // .subscribe(user => {
      //   updatedUser = user;
      //   this._ConfirmationAlertService.callToasterMsg('success', 'User updated succesfully');
      // }, err => {
      //   this._ConfirmationAlertService.callToasterMsg('error', err.error.message);
      // });
      // this.users$ = this.camundaUserService.getCamundaUserRequests();
    } else {
      this.camundaUserService.createCamundaUser(updatedUser).subscribe(newUser => {
        updatedUser = newUser;
        this.users$ = this.camundaUserService.getCamundaUserRequests();
        this._ConfirmationAlertService.callToasterMsg('success', 'User created succesfully');
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
    this.camundaUserService.deleteCamundaUser(this.userToDelete);
  }

  closeUserDetails() {
    this.requestToAddEdit = null;
    this.hideBackground = false;
  }

}
