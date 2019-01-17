import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {Request} from '../../types/Request';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  @Input() request: Request;
  @Output() notifyInitiate = new EventEmitter<Request>();
  @Output() notifyDelete = new EventEmitter<string>();
  @Output() notifyCloseComponent = new EventEmitter<any>();

  requestForm: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.requestForm = this._fb.group({
      'name': ['', [Validators.required]],
      'currentDate': ['', [Validators.required]],
      'comment': ['', [Validators.required]],
    });
   }

  ngOnInit() {
    console.log("init req. det. ", this.request);
  }

  close() {
    this.notifyCloseComponent.emit();
  }

 requestFormData(form: FormGroup) {
    this.request.creationDate = new Date();
    this.request.description = this.requestForm.controls.comment.value;

    //if role === user
    this.notifyInitiate.emit( this.request );
    this.close();
 }
}
