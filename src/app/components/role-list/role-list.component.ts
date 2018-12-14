import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Observable } from 'rxjs';
import { Role } from '../../types/role';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})

export class RoleListComponent implements OnInit {
  roleToEdit: Role;
  roles$: Observable<Role[]>;

  /*array where the items are stored*/
  roles : Array<Role>;

  /*table configuration JSON*/
  searchConfig : Object;

  /*variable to store the reference to the component itself (it's to be used in the table component)*/
  _self : any;

  constructor( private roleService : RoleService) { }

  ngOnInit() {
    this.roles$ = this.roleService.getRoles();

    /*store the reference to the elements list component (roles in this case)*/
    this._self = this;

    /*values to be used to configure the table*/
    this.searchConfig = {
      /*
        strings to be used internally by the table component to reference
        the items observer and the items array
      */
      names : {
        items : 'roles',
        asyncItems : 'roles$',
      },
      /*
        attributes to be used for sorting in the table
          asc : indicates if the default sorting is ascending or descending
      */
      fieldsToSort : {
        name : {
          asc : true,
        },
        description : {
          asc : true,
        },
      },
      /*
        attributes to be shown in the table (they should be the same as fieldsToSort, but not mandatory)
      */
      fieldsToEval : [
        {
          //attribute field name in the object
          name : 'name',
          //type of the field
          type : 'string',
          //string to be shown in the table when referrencing this attribute
          title : 'Name',
          //method to be used to show the value, if not specified it will be used [object].[name]
          value : 'displayName'
        },
        {
          name : 'description',
          type : 'string',
          title : 'Description',
        },
      ],
      //title to be used in the table
      title : 'Manage Roles',
      //actions to be triggered for create, update and delete controls
      actions : {
        //action
        create : {
          //name of the method that sould be declared in the current component
          method : 'createRole',
          //title to be shown in the interface in the control of the action
          title : 'Add Role',
        },
        update : {
          method : 'editRole',
          title : 'Edit',
        },
        delete : {
          method : 'deleteRole',
          title : 'delete',
        },
      },
    };
  }

  /* mandatory method */
  getItems() {
    return this.roles;
  }

  /* mandatory method */
  setItems(r) {
    this.roles = r;
  }

  createRole() {
    this.roleToEdit = new Role();
  }

  editRole( role: Role) {
    this.roleToEdit = role;
  }

  updateRole( updatedRole: Role) {
    if (updatedRole._id) {
      this.roleService.updateRole( updatedRole ).subscribe( role => updatedRole = role );
    } else {
      this.roleService.createRole( updatedRole ).subscribe( newRole => {
        updatedRole = newRole;
        this.roles$ = this.roleService.getRoles();
        this.roles.push(newRole);
        this.roleToEdit = null;
      });
    }
  }

  deleteRole( roleId: string, table : any ) {
    this.roleService.deleteRole( roleId ).subscribe( () => { 
      this.roles$ = this.roleService.getRoles();
      this.roles$.subscribe(table.refreshItems());
      this.roleToEdit = null; 
    });
  }

  closeRoleDetails() {
    this.roleToEdit = null;
  }
}
