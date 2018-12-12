import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/never';
import 'rxjs/add/operator/takeUntil';

//Import the IdamAuthService and Application User type
import { IdamAuthenticationService, ApplicationUser } from '@pa-util/angular2-idam';

@Component({
  selector: 'login-component',
  templateUrl: './idam-login-component.component.html',
  styleUrls: ['./idam-login-component.component.css']
})
export class IdamLoginComponent implements OnInit, OnDestroy {

  //Create subject to unsibscrive from
  private ngUnsubscrive: Subject<void> = new Subject<void>();

  //Create user account
  user: ApplicationUser;
  
  //Inject the Service
  constructor(private authService: IdamAuthenticationService, private http: Http) { }

ngOnInit() {
    this.authService.IsAuthenticatedStream()
      .takeUntil(this.ngUnsubscrive)
      .switchMap(x => {
        if (x) {
          //return this.authService.GetUser();
          return this.authService.getUserStream();
        }
        return Observable.never();
      })
      .takeUntil(this.ngUnsubscrive)
      .subscribe(u =>{ 
        this.user = u;
      });
  }

  // Way to unsubscrive from any observable 
  // https://stackoverflow.com/questions/38008334/angular-rxjs-when-should-i-unsubscribe-from-subscription
  ngOnDestroy(): void {
    this.ngUnsubscrive.next();
    this.ngUnsubscrive.complete();
  }

  login(): void{
    this.authService.NavigateToLogin();
  }

  logout(): void{
    this.authService.Logout();
  }

}