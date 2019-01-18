import { Injectable } from '@angular/core';
import { Adapter } from './IAdapter';

export class Request {
    _id: string;
    owner: string;
    status: string;
    description: string;
    creationDate: Date;

    constructor() { }

    /* displayName(): string {
        return this.name;
    } */
}

@Injectable({
    providedIn: 'root'
})
export class RequestAdapter implements Adapter<Request> {
    adapt( request: any ): Request {
        console.log("adapting ", request);
        const u = new Request();
        u._id = request.id;
        u.owner = request.processInstance.owner.value;
        u.status = request.name;
        u.description = request.processInstance.description.value;
        u.creationDate = request.processInstance.creationDate.value;
        return u;
    }
}
