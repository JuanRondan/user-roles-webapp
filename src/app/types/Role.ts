import { Injectable } from "@angular/core";
import { Adapter } from "./IAdapter";

export class Role {
    _id: string;
    name: string;
    description: string; 
    permissions : Array<Object>;

    constructor() {}

    displayName(): string {
        return this.name;
    }
}

@Injectable({
    providedIn: 'root'
})
export class RoleAdapter implements Adapter<Role> {
    adapt( role: any ): Role {
        let u = new Role();
        u._id = role._id;
        u.name = role.name;
        u.description = role.description;
        u.permissions = role.permissions;
        return u;
    }
}
