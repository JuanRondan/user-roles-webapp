import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../../services/request.service';
import { RoleService } from '../../services/role.service';
import { Request } from '../../types/Request';
import { Global, GLOBALS } from '../../utils/globals';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
  providers: [Global]
})
export class RequestComponent implements OnInit {
  showAddBtn: boolean;
  formAdd: boolean;
  fromValue: any;
  //tableData: any;
  tableSelectedData: any;
  /*table configuration JSON*/
  searchConfig: Object;
  requests: Request[];
  role: string;

  /*variable to store the reference to the component itself (it's to be used in the table component)*/
  _self: any;
  requestToEdit: Request;
  requests$: Observable<Request[]>;
  constructor(private requestService: RequestService,
    private roleService: RoleService,
    @Inject(GLOBALS) public global: Global) {
    this.showAddBtn = false;
    this.formAdd = true;
  }

  ngOnInit() {
    let roleId = this.global.userDetails.roles[0];
    if (roleId) {
      this.roleService.getRole( roleId ).subscribe(role => {
        this.role = role.name;
        this.requests$ = this.requestService.getRequests(this.global.userDetails.email, this.role);
        
        if (role.name === 'user') {
          this.showAddBtn = true;
        }
      });
    } else {
      console.log("user unauthorized to access this page");
    }

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
          name: 'owner',
          // type of the field
          type: 'string',
          // string to be shown in the table when referrencing this attribute
          title: 'Name',
          // method to be used to show the value, if not specified it will be used [object].[name]
          //value: 'displayName'
        },
        {
          name: 'status',
          type: 'string',
          title: 'Status'
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
    this.requestToEdit = new Request();
    this.requestToEdit.owner = this.global.userDetails.email;
    this.requestToEdit.creationDate = new Date();
  }
  // close modal
  closeRequestDetails() {
    this.requestToEdit = null;
  }

  // delete the request
  deleteRequest(event) {
    console.log(event);
  }

  // update the request
  initiateRequest(request: Request) {
    console.log("initiate request ", request);
    this.requestService.initiateRequest(request).subscribe( (response) => {      
      console.log("initiate request completed ", response);
      console.log("<<<< update table >>>>");
    });
  }

  /* mandatory method */
  getItems() {
    return this.requests;
  }

  /* mandatory method */
  setItems(r) {
    this.requests = r;
  }
  
  approveRequest(request: Request) {
    console.log("approving request ", request);
    this.requestService.approveRequest( request._id ).subscribe( (response) => {
      console.log("request approved ", response);
      console.log("<<<< update table >>>>");
    });
  }

  rejectRequest(request: Request) {
    console.log("rejecting request ", request);
    this.requestService.rejectRequest( request._id ).subscribe( (response) => {
      console.log("request rejected ", response);
      console.log("<<<< update table >>>>");
    })
  }

  editRequest(data, table) {
    // const selectedData = this.tableData.forEach(list => list['processInstanceId'] === data.instanceId);
    console.log(data);
    this.requestToEdit = data;
    this.tableSelectedData = data;
    this.formAdd = false;
    //this.requestToAdd = true;
  }
}



