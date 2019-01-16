import { InjectionToken } from '@angular/core';
import { ApplicationUser } from '@pa-util/angular2-idam';
import { User } from '../types/user';

export class Global {
    pageLoading = false;
    loadingRolePage = false;
    user: ApplicationUser = {};
    userDetails: User;
}

export const GLOBALS = new InjectionToken<Global>('GLOBALS'); // Injection token GLOBALS of type Global