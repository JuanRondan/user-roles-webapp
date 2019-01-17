import { Injectable } from '@angular/core';
import { Adapter } from './IAdapter';

export class Request {
    _id: string;
    name: string;
    description: string;
    permissions: Array<Object>;
    instanceId: string;
    status: string;
    creationDate: Date;

    constructor() {}

    displayName(): string {
        return this.name;
    }
}

@Injectable({
    providedIn: 'root'
})
export class RequestAdapter implements Adapter<Request> {
    adapt( request: any ): Request {
        const u = new Request();
        u._id = request._id;
        u.name = request.name;
        u.description = request.description;
        u.permissions = request.permissions;
        u.instanceId = request.processInstanceId;
        u.status = request.status;
        //u.creationDate = request.
        return u;
    }
}
