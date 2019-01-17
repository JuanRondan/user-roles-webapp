import { Component, OnInit, Inject, Inject, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../../services/request.service';
import { Request } from '../../types/Request';
import { Global, GLOBALS } from '../../utils/globals';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
  providers: [Global]
})
export class RequestComponent implements OnInit {
  /*table configuration JSON*/
  searchConfig: Object;

  /*variable to store the reference to the component itself (it's to be used in the table component)*/
  _self: any;
  requestToAdd: boolean;
  requests$: Observable<Request[]>;
  constructor(private _requestService: RequestService, @Inject(GLOBALS) public global: Global) { }

  ngOnInit() {
    this.requestToAdd = false;
    this.requests$ = this._requestService.getRequests( this.global.userDetails._id, this.global.userDetails.email);
    /*store the reference to the elements list component (roles in this case)*/
    this._self = this;

    /*values to be used to configure the table*/
    this.searchConfig = {
      /*
        strings to be used internally by the table component to reference
        the items observer and the items array
      */
      names: {
        items: 'requests',
        asyncItems: 'requests$',
      },
      /*
        attributes to be used for sorting in the table
          asc : indicates if the default sorting is ascending or descending
      */
      fieldsToSort: {
        name: {
          asc: true,
        },
        description: {
          asc: true,
        },
      },
      /*
        attributes to be shown in the table (they should be the same as fieldsToSort, but not mandatory)
      */
      fieldsToEval: [
        {
          // attribute field name in the object
          name: 'name',
          // type of the field
          type: 'string',
          // string to be shown in the table when referrencing this attribute
          title: 'Name',
          // method to be used to show the value, if not specified it will be used [object].[name]
          value: 'displayName'
        },
        {
          name: 'description',
          type: 'string',
          title: 'Description',
        },
      ],
      // title to be used in the table
      title: 'Manage Request',
      // actions to be triggered for create, update and delete controls
      actions: {
        // action
        create: {
          // name of the method that sould be declared in the current component
          method: 'createRequest',
          // title to be shown in the interface in the control of the action
          title: 'Add Request',
        },
        update: {
          method: 'editRequest',
          title: 'Edit',
        },
        delete: {
          method: 'deleteRequest',
          title: 'delete',
        }
      },
    };
  }

  createRequest() {
    this.requestToAdd = true;
  }
  // close modal
  closeRequestDetails() {
    console.log('close modal');
    this.requestToAdd = false;
  }

  // delete the request
  deleteRequest(event) {
    console.log(event);
  }

  // add the request
  addRequest(event) {
    console.log(event);
  }

  // update the request
  updateRequest(event) {
    console.log(event);
  }
}



