import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Request} from '../../types/Request';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  @Input() checkFormType: string;
  @Input() getFromValue: any;
  @Input() request: Request;
  @Output() notifyUpdate = new EventEmitter<Request>();
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
    if (this.checkFormType === 'Approve or Reject') {
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
  }
  requestFormData() {
    console.log(this.requestForm.controls);
  }
  approve() {
    this.notifyApprove.emit(this.requestForm.controls);
  }
  reject() {
    this.notifyReject.emit(this.requestForm.controls);
  }
}
