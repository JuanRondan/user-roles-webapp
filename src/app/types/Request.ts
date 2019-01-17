import { Injectable } from '@angular/core';
import { Adapter } from './IAdapter';

export class Request {
    _id: string;
    owner: string;
    name: string;
    description: string;
    creationDate: Date;

    constructor() { }

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
        u.creationDate = request.creationDate;
        return u;
    }
}
