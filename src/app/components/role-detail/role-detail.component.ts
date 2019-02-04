import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Role } from '../../types/role';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent implements OnInit {

  @Input() role: Role;
  @Input() updating: boolean;
  @Output() notifyCreate = new EventEmitter<Role>();
  @Output() notifyUpdate = new EventEmitter<Role>();
  @Output() notifyCloseComponent = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
  }

  onSubmit( form: any) {
    this.role.id = form.value.roleId;
    this.role.name = form.value.roleName;
    this.role.description = form.value.description;
    if (this.updating) {
      this.notifyUpdate.emit(this.role);
    } else {
      this.notifyCreate.emit(this.role);
    }
    this.close();
  }

/*   updatePermissions( rolePermissions: Object[] ) {
    this.role.permissions = rolePermissions;
  } */

  close() {
    this.notifyCloseComponent.emit();
  }
}
