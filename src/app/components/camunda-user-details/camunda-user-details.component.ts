import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CamundaUser } from '../../types/camunda-user';
import * as _ from 'lodash';
@Component({
  selector: 'app-camunda-user-details',
  templateUrl: './camunda-user-details.component.html',
  styleUrls: ['./camunda-user-details.component.css']
})
export class CamundaUserDetailsComponent implements OnInit {
  
  @Input() camundaUser: CamundaUser;
  @Input() formAdd: boolean;
  @Output() notifyUpdate = new EventEmitter<any>();
  @Output() notifyCloseComponent = new EventEmitter<any>();
  requestForm: FormGroup;
  constructor(private _fb: FormBuilder) {

    //this.requestForm.disable();
  }

  ngOnInit() {
    this.requestForm = this._fb.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'guid': ['', [Validators.required]],
      'roles': [''],
      'status': [''],
    });
    if (!this.formAdd) {
      delete (this.requestForm.controls.password);
    }
    console.log(this.camundaUser);
    if (!this.formAdd) {
      this.requestForm.patchValue({
        'firstName': this.camundaUser.firstName,
        'lastName': this.camundaUser.lastName,
        'email': this.camundaUser.email,
        'password': this.camundaUser.password,
        'guid': this.camundaUser.id,
        'roles': this.camundaUser.roles,
        'status': this.camundaUser.status
      });
    }
  }
  requestFormData(form: FormGroup) {
    const formValue = _.clone(form.value);
    formValue.roles = this.camundaUser.roles;
    if (!this.formAdd) {
      formValue.id = this.camundaUser['id'];
    }
    this.notifyUpdate.emit(formValue);
    this.close();
  }
  close() {
    this.notifyCloseComponent.emit();
  }
  updateRoles( userRoles: string[] ) {
    this.camundaUser.roles = userRoles;
  }
}
