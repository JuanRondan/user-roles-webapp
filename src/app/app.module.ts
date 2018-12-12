import './utils/shim';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { GLOBALS } from './utils/globals';
import { AuthInterceptorService} from './services/auth-interceptor-service.service';
import { Angular2IdamModule } from '@pa-util/angular2-idam';
import { environment } from '../environments/environment';
import { IdamLoginComponent } from './components/idam-login-component/idam-login-component.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { RoleDetailComponent } from './components/role-detail/role-detail.component';
import { RolePickerComponent } from './components/role-picker/role-picker.component';
import { RolePermissionsPickerComponent } from './components/role-permissions-picker/role-permissions-picker.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';

const appRoutes : Routes = [
  { path : 'users', component : UserListComponent },
  { path : 'roles', component : RoleListComponent },
  //{ path: '',   redirectTo: 'users', pathMatch: 'full' },
  { path: '', component: IdamLoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    IdamLoginComponent,
    UserListComponent,
    UserDetailComponent,
    RoleListComponent,
    RoleDetailComponent,
    UserSearchComponent,
    RolePickerComponent,
    RolePermissionsPickerComponent,
    ModalDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    Angular2IdamModule.forRoot({
      discoveryUrl: environment.discoveryUrl,
      redirect: environment.redirect,
      clientId: environment.clientId,
    }),
    RouterModule.forRoot(appRoutes, { enableTracing: environment.production }),
  ],
  providers: [
    { provide: GLOBALS, multi: false, useValue: {}}, //INCLUDE THIS IF YOU ARE CREATING AN INJECTION TOKEN (shown below)
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }, //INCLUDE THIS IF YOU ARE USING AN INTERCEPTOR (angular version 4.3 and above, shown below)
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
