import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductListComponent} from './components/view-products/product-list.component';
import {AuthGuard} from "./guard/auth.guard";
import {AuthenticationService} from "./services/authentication.service";
import {EmployeeListComponent} from './components/employee-list/employee-list.component';
import {IsSignedInGuard} from "./guard/IsSignedInGuard";
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {PageNotFoundActivateGuard} from "./guard/page-not-found-activate-guard.service";
import {AuthorizationInterceptor} from "./services/authorization.interceptor";
import {NavBarModule} from "./components/nav-bar/nav-bar.module";
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    EmployeeListComponent,
    PageNotFoundComponent,
    ProductDetailComponent
  ],
  imports: [
    NavBarModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true
  }, AuthGuard, IsSignedInGuard, AuthenticationService, PageNotFoundActivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
