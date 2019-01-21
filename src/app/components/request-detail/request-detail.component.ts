import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Request } from '../../types/Request';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  @Input() formAdd: boolean;
  @Input() showApproveReject: boolean;
  @Input() request: Request;
  @Output() notifyInitiate = new EventEmitter<Request>();
  @Output() notifyDelete = new EventEmitter<string>();
  @Output() notifyCloseComponent = new EventEmitter<any>();
  @Output() notifyApprove = new EventEmitter<any>();
  @Output() notifyReject = new EventEmitter<any>();

  requestForm: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.requestForm = this._fb.group({
      'name': [{value: ''}, [Validators.required]],
      'created': [{value: '', disabled: true}, [Validators.required]],
      'description': [{value: ''}, [Validators.required]]
    });
    //this.requestForm.disable();
  }

  ngOnInit() {
    this.requestForm.patchValue({
      'name': this.request.owner,
      'created': this.request.creationDate,
      'description': this.request.description
    });
    // this.requestForm.created.disable();
  }

  close() {
    this.notifyCloseComponent.emit();
    console.log(this.formAdd);
  }

  requestFormData(form: FormGroup) {
    this.request.description = this.requestForm.controls.description.value;
    this.notifyInitiate.emit(this.request);
    this.close();
  }

  approve() {
    // this.notifyApprove.emit(this.request);
    console.log(this.requestForm.valid);
    this.close();
  }
  reject() {
    this.notifyReject.emit(this.request);
    this.close();
  }
}
