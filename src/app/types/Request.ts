import { Injectable } from '@angular/core';
import { Adapter } from './IAdapter';

export class Request {
    _id: string;
    owner: string;
    status: string;
    description: string;
    creationDate: Date;
    completed: boolean;

    constructor() { }

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
        if ((request.name).includes( "ACCEPTED" )) {
            u.status = "Accepted";
            u.completed = true;
        } else if ((request.name).includes( "REJECTED" )) {
            u.status = "Rejected";
            u.completed = true;
        } else {
            u.status = request.name;
            u.completed = false;
        }
        u.description = request.processInstance.description.value;
        u.creationDate = request.processInstance.creationDate.value;
        return u;
    }
}
