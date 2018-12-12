import { Observable } from 'rxjs/Observable';
import { of, timer, never } from 'rxjs';
Object.getPrototypeOf(Observable).of = of;
Object.getPrototypeOf(Observable).timer = timer;
Object.getPrototypeOf(Observable).never  = never;
