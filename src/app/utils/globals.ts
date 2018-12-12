import { InjectionToken } from '@angular/core';
import { ApplicationUser } from '@pa-util/angular2-idam';

export class Global {
    pageLoading = false;
    loadingRolePage = false;
    user: ApplicationUser = {};
}

export const GLOBALS = new InjectionToken<Global>('GLOBALS'); // Injection token GLOBALS of type Global