import { Injectable } from "@angular/core";
import { Adapter } from "./IAdapter";

export class User {
    _id: string;
    firstName: string;
    lastName: string;
    guid: string;
    address: string;
    phone: string;
    email: string;
    roles: string[];
    status: boolean;

    constructor() {
        this.roles = new Array<string>();
    }

    displayName(): string {
        return this.firstName + " " + this.lastName;
    }
}

@Injectable({
    providedIn: 'root'
})
export class UserAdapter implements Adapter<User> {
    adapt( user: any ): User {
        let u = new User();
        u._id = user._id;
        u.firstName = user.firstName;
        u.lastName = user.lastName;
        u.guid = user.guid;
        u.address = user.address;
        u.phone = user.phone;
        u.email = user.email;
        u.roles = user.roles;
        u.status = user.status;
        return u;
    }
}
