import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Request} from '../../types/Request';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  @Input() request: Request;
  @Output() notifyUpdate = new EventEmitter<Request>();
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
  }

  close() {
    this.notifyCloseComponent.emit();
  }
  requestFormData() {
    console.log(this.requestForm.controls);
  }
}
