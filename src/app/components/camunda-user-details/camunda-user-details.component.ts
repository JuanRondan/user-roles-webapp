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
  
  @Input() formData: any;
  @Input() formAdd: boolean;
  @Output() notifyUpdate = new EventEmitter<any>();
  @Output() notifyCloseComponent = new EventEmitter<any>();
  camundaUser: CamundaUser;
  requestForm: FormGroup;
  constructor(private _fb: FormBuilder) {

    //this.requestForm.disable();
  }

  ngOnInit() {
    this.requestForm = this._fb.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
    if (!this.formAdd) {
      this.requestForm.patchValue({
        'firstName': this.formData.firstName,
        'lastName': this.formData.lastName,
        'email': this.formData.email,
        'password': this.formData.password
      });
    }
  }
  requestFormData(form: FormGroup) {
    const formValue = _.clone(form.value);
    if (!this.formAdd) {
      formValue._id = this.formData['_id'];
    }
    this.notifyUpdate.emit(formValue);
    this.close();
  }
  close() {
    this.notifyCloseComponent.emit();
  }
}
