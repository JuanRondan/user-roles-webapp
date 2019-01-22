import { Injectable } from '@angular/core';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationAlertService {

  constructor(private _toasterService: ToasterService) { }

  callToasterMsg(type: string, title: string) {
    const toast = {
        type: type,
        title: title,
    };
    this._toasterService.pop(toast);
}
}
