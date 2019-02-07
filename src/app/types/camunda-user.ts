import { Injectable } from '@angular/core';
import { Adapter } from './IAdapter';

export class CamundaUser {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    password: string;
    constructor() { }

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
        u.password = camundaUser.password;
        return u;
    }
}
