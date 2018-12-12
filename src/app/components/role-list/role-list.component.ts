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

  /***/roles : Array<Role>;
  /***/searchConfig : Object;
  /***/_self : any;

  constructor( private roleService: RoleService) { }

  ngOnInit() {
    this.roles$ = this.roleService.getRoles();
    /***/this._self = this;
    /***/this.searchConfig = {
      names : {
        items : 'roles',
      },
      fieldsToSort : {
        name : true,
        description : true,
      },
      fieldsToEval : [
        {
          name : 'name',
          type : 'string',
        },
        {
          name : 'description',
          type : 'string',
        },
      ],
    };
  }

  /***/getItems() {
    return this.roles;
  }

  /***/setItems(r) {
    this.roles = r;
  }

  createRole() {
    this.roleToEdit = new Role();
  }

  editRole( role: Role) {
    this.roleToEdit = role;
  }

  updateRole( updatedRole: Role ) {
    if (updatedRole._id) {
      this.roleService.updateRole( updatedRole ).subscribe( role => updatedRole = role );
    } else {
      this.roleService.createRole( updatedRole ).subscribe( newRole => {
        updatedRole = newRole;
        this.roles$ = this.roleService.getRoles();
        this.roleToEdit = null;
      });
    }
  }

  deleteRole( roleId: string ) {
    this.roleService.deleteRole( roleId ).subscribe( () => { 
      this.roles$ = this.roleService.getRoles(); 
      this.roleToEdit = null; 
    });
  }

  closeRoleDetails() {
    this.roleToEdit = null;
  }

}
