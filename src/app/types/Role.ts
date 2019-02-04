import { Injectable } from "@angular/core";
import { Adapter } from "./IAdapter";

export class Role {
    id: string;
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
        u.id = role.id;
        u.name = role.name;
        u.description = role.type;
        return u;
    }
}
