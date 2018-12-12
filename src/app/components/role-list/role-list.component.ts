import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Observable } from 'rxjs';

import { Role } from '../../types/role';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  roles$: Observable<Role[]>;
  roleToEdit: Role;
  
  constructor( private roleService: RoleService) { }

  ngOnInit() {
    this.roles$ = this.roleService.getRoles();
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
