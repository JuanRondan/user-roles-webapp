import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {Request} from '../../types/Request';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  @Input() formAdd: boolean;
  @Input() getFromValue: any;
  @Input() request: Request;
  @Output() notifyInitiate = new EventEmitter<Request>();
  @Output() notifyDelete = new EventEmitter<string>();
  @Output() notifyCloseComponent = new EventEmitter<any>();
  @Output() notifyApprove =  new EventEmitter<any>();
  @Output() notifyReject =  new EventEmitter<any>();

  requestForm: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.requestForm = this._fb.group({
      'name': ['', [Validators.required]],
      'created': ['', [Validators.required]],
      'description': ['', []]
    });
    if (this.formAdd === false) {
      this.requestForm.disable();
      this.requestForm.patchValue({
        'name': this.getFromValue.name,
        'created': this.getFromValue.created,
        'description': this.getFromValue.description
      });
    }
   }

  ngOnInit() {
    
  }

  close() {
    this.notifyCloseComponent.emit();
    console.log(this.formAdd);
  }

 requestFormData(form: FormGroup) {
    // this.request.creationDate = new Date();
    // this.request.description = this.requestForm.controls.comment.value;

    //if role === user
    this.notifyInitiate.emit( this.requestForm.value);
    this.close();
 }
 
  approve() {
    this.notifyApprove.emit(this.requestForm.controls.value);
  }
  reject() {
    this.notifyReject.emit(this.requestForm.controls);
  }
}
