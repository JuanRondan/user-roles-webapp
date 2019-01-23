import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Global, GLOBALS } from '../../utils/globals';
import { RequestService } from '../../services/request.service';
import { RoleService } from '../../services/role.service';
import { ConfirmationAlertService } from '../../services/common-service/confirmation-alert.service';
import { Request } from '../../types/Request';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],

})
export class RequestComponent implements OnInit {

  showAddBtn: boolean;
  hideBackground: boolean;
  formAdd: boolean;
  fromValue: any;
  role: string;
  requests$: Observable<Request[]>;
  requestToEdit: Request;
  showCompleted: boolean = false;

  constructor(private requestService: RequestService,
    private roleService: RoleService,
    private _ConfirmationAlertService: ConfirmationAlertService,
    @Inject(GLOBALS) public global: Global) {

    this.showAddBtn = false;
    this.formAdd = true;
  }

  ngOnInit() {
    let roleId = this.global.userDetails.roles[0];
    if (roleId) {
      this.roleService.getRole(roleId).subscribe(role => {
        this.role = role.name;
        this.refreshList();
        if (role.name === 'user') {
          this.showAddBtn = true;
        }
      });
    } else {
      console.log("user unauthorized to access this page");
    }
  }

  createRequest() {
    this.requestToEdit = new Request();
    this.requestToEdit.owner = this.global.userDetails.email;
    this.requestToEdit.creationDate = new Date();
  }

  editRequest(request: Request) {
    this.requestToEdit = request;
    this.formAdd = false;
    this.hideBackground =  true;
    if (this.role !== 'user') {
      this.showAddBtn = false;
    }
  }

  initiateRequest(request: Request) {
    this.requestService.initiateRequest(request).subscribe((response) => {
      console.log("initiate request completed ", response);
      // const toast = { type: 'success', title: 'Initiated Successfully' };
      this._ConfirmationAlertService.callToasterMsg('success', 'Request initiated successfully');
      this.refreshList();
    }, err => {
      // const toast = { type: 'error', title: err.error.message };
      // this._toasterService.pop(toast);
      this._ConfirmationAlertService.callToasterMsg('error', err.error.message);
    });
  }

  approveRequest(request: Request) {
    this.requestService.approveRequest(request._id).subscribe((response) => {
      console.log("request approved ", response);
      this._ConfirmationAlertService.callToasterMsg('success', 'Request approved');
      this.refreshList();
    });
  }

  rejectRequest(request: Request) {
    this.requestService.rejectRequest(request._id).subscribe((response) => {
      console.log("request rejected ", response);
      this._ConfirmationAlertService.callToasterMsg('success', 'Request rejected');      
      this.refreshList();
    });
  }

  toggleHideCompleted() {
    this.showCompleted = !this.showCompleted;
    this.refreshList();
  }

  closeRequestDetails() {
    this.requestToEdit = null;
    this.formAdd = true;
    this.hideBackground =  false;
    if (this.role === 'user') {
      this.showAddBtn = true;
    }
  }

  refreshList() {
    if (this.showCompleted) {
      this.requests$ = this.requestService.getRequests(this.global.userDetails.email, this.role);
    } else {
      this.requests$ = this.requestService.getRequests(this.global.userDetails.email, this.role).pipe(
        map(allReqs => allReqs.filter(oneReq => {
          if (oneReq.status !== "Accepted" && oneReq.status !== "Rejected") {
            console.log("filtering " + oneReq.description);
            return true;
          }
        }))
      );
    }
  }
}



