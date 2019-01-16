import { Injectable } from '@angular/core';
import { Adapter } from './IAdapter';

export class Request {
    _id: string;
    name: string;
    description: string;
    permissions: Array<Object>;

    constructor() {}

    displayName(): string {
        return this.name;
    }
}

@Injectable({
    providedIn: 'root'
})
export class RoleAdapter implements Adapter<Request> {
    adapt( request: any ): Request {
        const u = new Request();
        u._id = request._id;
        u.name = request.name;
        u.description = request.description;
        u.permissions = request.permissions;
        return u;
    }
}
