import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { User } from '../../types/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;
  @Output() notifyUpdate = new EventEmitter<User>();
  @Output() notifyDelete = new EventEmitter<string>();
  @Output() notifyCloseComponent = new EventEmitter<any>();
  @ViewChild( "userForm" ) userForm: NgForm;

  constructor() {}

  ngOnInit() {
  }

  onSubmit( form: any) {
    this.user.firstName = form.value.firstName;
    this.user.lastName = form.value.lastName;
    this.user.guid = form.value.guid;
    this.user.address = form.value.address;
    this.user.phone = form.value.phone;
    this.user.email = form.value.email;
    this.user.status = form.value.status;
    this.notifyUpdate.emit(this.user);
    this.close();
  }

  updateRoles( userRoles: string[] ) {
    this.user.roles = userRoles;
  }

  close() {
    this.notifyCloseComponent.emit();
  }
}
