import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { RoleService } from '../../services/role.service';
import { Role } from '../../types/role';

@Component({
  selector: 'app-role-permissions-picker',
  templateUrl: './role-permissions-picker.component.html',
  styleUrls: ['./role-permissions-picker.component.css']
})
export class RolePermissionsPickerComponent implements OnInit {
  @Input() modulesWithPermissions: Array<any>;
  @Output() updatePermissions = new EventEmitter<Object[]>();

  roles: Role[];
  subsRoles: Subscription;
  permissions : Array<String>;
  modules : Array<String>;

  constructor( private roleService: RoleService) {
    this.permissions = ['Create', 'Read', 'Update', 'Delete'];
    this.modules = ['Users', 'Roles'];
    //this.modulesWithPermissions = [];
  }

  ngOnInit() {
  }

  currentModule(module:string):any{
    this.modulesWithPermissions = this.modulesWithPermissions || [];
    let selectedModule = this.modulesWithPermissions.find(g=>g.name === module);
    return selectedModule;
  }

  checkForPermission(module:string, permission: string ): boolean {
    let selectedModule = this.currentModule(module);
    return selectedModule ? selectedModule.permissions.includes( permission ) : false;
  }

  onPermissionCheck( module : string, permission: string) {
    let selectedModule = this.currentModule(module);

    if (!selectedModule) {
      this.modulesWithPermissions.push({
        name : module,
        permissions : [],
      });
      selectedModule = this.currentModule(module);
    }

    let index = selectedModule.permissions.indexOf( permission);

    if ( index > -1) {
      selectedModule.permissions.splice( index, 1 );
    } else {
      selectedModule.permissions.push( permission );
    }

    this.updatePermissions.emit( this.modulesWithPermissions );
  }

  ngOnDestroy() {
    if (this.subsRoles) this.subsRoles.unsubscribe();
  }
}
