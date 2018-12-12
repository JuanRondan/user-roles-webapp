import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { RoleService } from '../../services/role.service';
import { Role } from '../../types/role';

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
    this.subsRoles = this.roleService.getRoles().subscribe( roles => this.roles = roles );
  }

  checkForRole( id: string ): boolean {
    return this.selectedRoles.includes( id );
  }

  onRoleCheck( role: Role) {
    let index = this.selectedRoles.indexOf( role._id);
    if ( index > -1) {
      this.selectedRoles.splice( index, 1 );
    } else {
      this.selectedRoles.push( role._id );
    }
    this.updatedRoles.emit( this.selectedRoles );
  }

  ngOnDestroy() {
    if (this.subsRoles) this.subsRoles.unsubscribe();
  }
}
