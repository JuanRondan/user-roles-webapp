import './utils/shim';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { Angular2IdamModule, AuthGuard } from '@pa-util/angular2-idam';
import { AuthInterceptorService} from './services/auth-interceptor-service.service';
import { IdamLoginComponent } from './components/idam-login-component/idam-login-component.component';
import { TridentModule } from '@pa-util/trident-rolemanagement';
import { AppRolesResolver } from '@pa-util/trident-rolemanagement/resolvers/app-roles-resolver.service';
import { AppUserRolesResolver } from '@pa-util/trident-rolemanagement/resolvers/app-user-roles-resolver.service';
import { RoleEditorGuard } from '@pa-util/trident-rolemanagement/guards/role-editor.guard';
import { UserRoleEditorGuard } from '@pa-util/trident-rolemanagement/guards/user-role-editor.guard'

import { RoleListComponent } from './components/role-list/role-list.component';
import { RoleDetailComponent } from './components/role-detail/role-detail.component';
import { RolePickerComponent } from './components/role-picker/role-picker.component';
import { RolePermissionsPickerComponent } from './components/role-permissions-picker/role-permissions-picker.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { GLOBALS } from './utils/globals';
import { environment } from '../environments/environment';
import { RequestComponent } from './components/request/request.component';
import { RequestDetailComponent } from './components/request-detail/request-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule, ToasterService} from 'angular2-toaster';

const appRoutes : Routes = [
  { path : 'users',
    component : UserListComponent,
    //resolve: { resolvedRoles: AppRolesResolver },
    //canActivate: [AuthGuard, RoleEditorGuard]
  },
  { path : 'roles',
    component : RoleListComponent,
    //resolve: { resolvedUser: AppUserRolesResolver, resolvedRoles: AppRolesResolver },
    //canActivate: [AuthGuard, UserRoleEditorGuard ]
  },
  { path : 'requests',
    component : RequestComponent,
  },
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
    DynamicTableComponent,
    RequestComponent,
    RequestDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    Angular2IdamModule.forRoot({
      discoveryUrl: environment.discoveryUrl,
      redirect: environment.redirect,
      clientId: environment.clientId,
    }),
    TridentModule.forRoot({
      tridentUrl: environment.tridentUrl
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
