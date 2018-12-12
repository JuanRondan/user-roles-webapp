import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import './utils/shim';
import { GLOBALS, Global } from './utils/globals';
import { IdamAuthenticationService } from '@pa-util/angular2-idam';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  firstInitial : string;
  lastInitial : string;
  uName : string;
  uLastName : string;
  showPupUpUser : boolean;
  router : Router;
  isLogged : boolean;
  showSidebar : boolean;

  constructor(
            public authService: IdamAuthenticationService,
            @Inject(GLOBALS)public g: Global, //Recomended injection token this is how to inject it on your components and services,
            router : Router,
    ) {
      this.router = router;
    }

  ngOnInit(): void {
    this.authService.TryLogin(); // This this step is required in order to login, if it is not included you will get an error saying the path login/token is not found

    this.authService.getUserStream() // We recommend retrieving the user from here and passing it down to an InjectionToken
    .takeUntil(this.ngUnsubscribe)
    .subscribe(u => {
      this.g.user = u;
      if (u && u.given_name) {
        this.firstInitial = this.g.user.given_name[0];
        this.lastInitial = this.g.user.family_name[0];
        this.uName = this.g.user.given_name;
        this.uLastName = this.g.user.family_name;
        this.router.navigate(['users']);
        this.isLogged = true;
      } else {
        this.isLogged = false;
        //this is not good, please think in a better alternative
        if (!window.localStorage.getItem("notFirstTime")) {
          window.localStorage.setItem("notFirstTime", "true");
          this.authService.NavigateToLogin();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  togglePopUp(): void { 
    this.showPupUpUser = !this.showPupUpUser;
  }

  sidebarCollapse(): void {
    this.showSidebar = !this.showSidebar;
  }

  logout(): void{
    this.authService.Logout();
    location.replace('/');
  }

  login(): void{
    this.authService.NavigateToLogin();
  }
}
