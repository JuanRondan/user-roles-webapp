import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Role } from '../../types/role';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent implements OnInit {

  @Input() role: Role;
  @Output() notifyUpdate = new EventEmitter<Role>();
  @Output() notifyDelete = new EventEmitter<string>();
  @Output() notifyCloseComponent = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
  }

  onSubmit( form: any) {
    this.role.name = form.value.roleName;
    this.role.description = form.value.description;
    this.notifyUpdate.emit(this.role);
    this.close();
  }

  deleteRole() {
    this.notifyDelete.emit( this.role._id );
    this.role = null;
  }

  updatePermissions( rolePermissions: Object[] ) {
    this.role.permissions = rolePermissions;
  }

  close() {
    this.notifyCloseComponent.emit();
  }
}
