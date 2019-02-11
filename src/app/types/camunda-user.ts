import { Injectable } from '@angular/core';
import { Adapter } from './IAdapter';

export class CamundaUser {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    password: string;
    guid: string;
    roles: string[];
    status: boolean;
    constructor() {
        this.roles = new Array<string>();
    }

    displayName(): string {
        return this.firstName + ' ' + this.lastName;
    }

}
@Injectable({
    providedIn: 'root'
})

export class CamundaUserAdapter implements Adapter<CamundaUser> {
    adapt( camundaUser: any ): CamundaUser {
        const u = new CamundaUser();
        u.id = camundaUser.id;
        u.firstName = camundaUser.firstName;
        u.lastName = camundaUser.lastName;
        u.fullName = camundaUser.fullName;
        u.email = camundaUser.email;
        u.guid = camundaUser.guid;
        u.roles = camundaUser.roles;
        u.password = camundaUser.password;
        u.status = camundaUser.status;
        return u;
    }
}
