import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { RoleService } from '../../services/role.service';
import { Role } from '../../types/role';
import * as _ from 'lodash';

@Component({
  selector: 'app-role-picker',
  templateUrl: './role-picker.component.html',
  styleUrls: ['./role-picker.component.css']
})
export class RolePickerComponent implements OnInit {

  @Input() selectedRoles: string[];
  @Output() updatedRoles = new EventEmitter<string[]>();

  roles: Role[];
  subsRoles: Subscription;

  constructor( private roleService: RoleService) { }

  ngOnInit() {
    this.subsRoles = this.roleService.getRoles().subscribe( roles => {
      this.roles = roles;
      this.checkboxPrePopulate();
    });
  }

  checkForRole( id: string ): boolean {
    return this.selectedRoles.includes( id );
  }

  onRoleCheck( role: Role) {
    let index = this.selectedRoles.indexOf( role.id);
    if ( index > -1) {
      this.selectedRoles.splice( index, 1 );
    } else {
      this.selectedRoles.push( role.id );
    }
    this.updatedRoles.emit( this.selectedRoles );
  }
  checkboxPrePopulate() {
    if (this.roles.length > 0 && this.selectedRoles.length > 0) {
      let checkForIdMatch = null;
      this.roles.forEach((roles) => {
        checkForIdMatch = _.find(this.selectedRoles, (selectedId) => {
          if (roles.id === selectedId) {
            return true;
          } else {
            return false;
          }
        });
        if (checkForIdMatch) {
          roles['selected'] = true;
        } else {
          roles['selected'] = false;
        }
      });
    }
  }
  ngOnDestroy() {
    if (this.subsRoles) this.subsRoles.unsubscribe();
  }
}
