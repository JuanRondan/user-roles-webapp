import { Component, OnInit, Inject } from '@angular/core';
import { CamundaUserService } from '../../services/camunda-user.service';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { CamundaUser } from '../../types/camunda-user';
import { Global, GLOBALS } from '../../utils/globals';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationAlertService } from '../../services/common-service/confirmation-alert.service';
import {AppComponent} from '../../app.component';
@Component({
  selector: 'app-camunda-user-list',
  templateUrl: './camunda-user-list.component.html',
  styleUrls: ['./camunda-user-list.component.css'],
  providers: [AppComponent]
})
export class CamundaUserListComponent implements OnInit {

  users$: Observable<CamundaUser[]>;
  showModal: boolean;
  userToDelete: string;
  hideBackground: boolean;
  showAddBtn: boolean;
  requestToAddEdit: CamundaUser;
  formAdd: boolean;
  editDisabled: boolean;
  deleteDisabled: boolean;
  table: any;
  userRoles;
  selectedUserRoles: any;

  /*array where the items are stored*/
  users: Array<CamundaUser>;

  /*table configuration JSON*/
  searchConfig: Object;

  /*variable to store the reference to the component itself (it's to be used in the table component)*/
  _self: any;

  constructor(private camundaUserService: CamundaUserService,
    private _ConfirmationAlertService: ConfirmationAlertService,
    private appComponent: AppComponent,
    @Inject(GLOBALS) public global: Global,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.showAddBtn = false;
    this.deleteDisabled = true;
    this.editDisabled = true;
    this.refreshRoleInGlobal();
    this.users$ = this.camundaUserService.getCamundaUserRequests();
    this.formAdd = true;
    // this.users = this.route.snapshot.data.resolvedUsers;
    // this.roles = this.route.snapshot.data.resolvedRoles;

    /*store the reference to the elements list component (roles in this case)*/
    this._self = this;

    /*values to be used to configure the table*/
    this.searchConfig = {
      /*
        strings to be used internally by the table component to reference
        the items observer and the items array
      */
      names: {
        items: 'users',
        asyncItems: 'users$',
      },
      /*
        attributes to be used for sorting in the table
          asc : indicates if the default sorting is ascending or descending
      */
      fieldsToSort: {
        fullName: {
          asc: true,
        },
        email: {
          asc: true,
        },
      },
      /*
        attributes to be shown in the table (they should be the same as fieldsToSort, but not mandatory)
      */
      fieldsToEval: [
        {
          // attribute field name in the object
          name: 'fullName',
          // type of the field
          type: 'string',
          // string to be shown in the table when referrencing this attribute
          title: 'Name',
          // // method to be used to show the value, if not specified it will be used [object].[name]
          // value : 'displayName'
        },
        {
          name: 'email',
          type: 'string',
          title: 'Email',
        },
      ],
      // title to be used in the table
      title: 'Camunda User',
      // actions to be triggered for create, update and delete controls
      actions: {
        // action
        create: {
          // name of the method that sould be declared in the current component
          method: 'addUser',
          // title to be shown in the interface in the control of the action
          title: 'Add User',
        },
        update: {
          method: 'editUser',
          title: 'Edit',
        },
        delete: {
          method: 'deleteUser',
          title: 'delete',
        },
      },
    };
  }
  /* mandatory method */
  getItems() {
    return this.users;
  }

  /* mandatory method */
  setItems(r) {
    this.users = r;
  }

  addUser(table: any) {
    this.table = table;
    this.requestToAddEdit = new CamundaUser();
    this.hideBackground = true;
    this.formAdd = true;
  }

  editUser(userData: CamundaUser, table: any) {
    this.camundaUserService.camundaUserRoleList(userData.id).subscribe((roles) => {
      this.selectedUserRoles = roles;
      const roleList = _.map(roles, 'id');
      // const roleList = this.userRoles;
      this.table = table;
      userData.roles = roleList;
      this.requestToAddEdit = userData;
    });

    // if (this.requestToAddEdit.roles === undefined) {
    //   this.requestToAddEdit.roles = [];
    // }
    this.formAdd = false;
    this.hideBackground = true;
  }

  createCamundaUser(updatedUser: CamundaUser) {
    if (this.formAdd) {
      // add user
      this.camundaUserService.createCamundaUser(updatedUser).subscribe(newUser => {
        this.users$ = this.camundaUserService.getCamundaUserRequests();
        this.users$.subscribe(this.table.refreshItems());
        this._ConfirmationAlertService.callToasterMsg('success', 'User created succesfully');
        updatedUser.roles.forEach(roles => {
          const reqData = {
            guid: updatedUser.guid,
            roleId: roles
          };
          this.camundaUserService.camundaUserRoleAssignment(reqData).subscribe(user => {
            this.users$.subscribe(this.table.refreshItems());
          });
        });
      });
    } else {
      // edit user
      this.camundaUserService.updateCamundaUser(updatedUser).subscribe(user => {
        this.users$ = this.camundaUserService.getCamundaUserRequests();
        this.users$.subscribe(this.table.refreshItems());
        this._ConfirmationAlertService.callToasterMsg('success', 'User updated succesfully');
      }, err => {
        this._ConfirmationAlertService.callToasterMsg('error', err.error.message);
      });
      // const rolesToAdd = _.difference(updatedUser.roles, this.userRoles);
      const userSelectedRoleId = _.map(this.selectedUserRoles, 'id');
      const addRoles = updatedUser.roles.filter(e => !userSelectedRoleId.includes(e));
      const removeRoles = userSelectedRoleId.filter(e => !updatedUser.roles.includes(e));
      // adding roles to user
      if (addRoles.length > 0) {
        addRoles.forEach((userRoles) => {
          const reqDataToAdd = {
            guid: updatedUser.id,
            roleId: userRoles
          };
          this.camundaUserService.camundaUserRoleAssignment(reqDataToAdd).subscribe(user => {
            this.users$.subscribe(this.table.refreshItems());
          });
        });
      }
      // removing roles from user
      if (removeRoles.length > 0) {
        removeRoles.forEach((userRoles) => {
          const reqDataToRemove = {
            guid: updatedUser.id,
            roleId: userRoles
          };
          this.camundaUserService.camundaUserRoleRemoval(reqDataToRemove).subscribe(user => {
            this.users$.subscribe(this.table.refreshItems());
          });
        });
      }
      this.appComponent.ngOnInit();
      this.refreshRoleInGlobal();
      // this.users$ = this.camundaUserService.getCamundaUserRequests();      
    }
  }

  deleteUser(userId: string, table: any) {
    this.userToDelete = userId;
    this.showModal = true;
    this.table = table;
    this.hideBackground = true;
    // this.deleteUserCall(userId, table);
  }

  cancelDelete() {
    this.showModal = false;
    this.hideBackground = false;
  }

  // deleteUser(userId: string, table: any) {
  //   this.showModal = true;
  // }

  confirmDelete() {
    this.camundaUserService.deleteCamundaUser(this.userToDelete).subscribe(() => {
      this.users$ = this.camundaUserService.getCamundaUserRequests();
      this.users$.subscribe(this.table.refreshItems());
      this._ConfirmationAlertService.callToasterMsg('success', 'User deleted succesfully');
      this.requestToAddEdit = null;
      this.cancelDelete();
    });
  }
  refreshRoleInGlobal() {
    const userGuid = this.global.userDetails['id'];
    this.camundaUserService.camundaUserRoleList(userGuid).subscribe((roles) => {
      this.selectedUserRoles = roles;
      const roleList = _.map(roles, 'id');
      this.global.userDetails.roles = roleList;
      this.checkRole();
    });
  }
  checkRole() {
    this.userRoles = this.global.userDetails.roles;
    if (this.userRoles[0] === 'admin') {
      this.showAddBtn = true;
      this.deleteDisabled = false;
      this.editDisabled = false;
    }
  }
  closeUserDetails() {
    this.requestToAddEdit = null;
    this.hideBackground = false;
  }
  // TO RELOAD THE PAGE AFTER CHANGE IN ROLE
  // refresh(): void {
  //   window.location.reload();
  // }
}
