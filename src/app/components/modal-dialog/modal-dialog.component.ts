import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {

  @Input() message: string;
  @Output() cancel = new EventEmitter<any>();
  @Output() confirm = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit() {
  }

  close() {
    this.cancel.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }

}
