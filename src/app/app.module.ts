import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuard} from "./guard/auth.guard";
import {AuthenticationService} from "./services/authentication.service";
import {IsSignedInGuard} from "./guard/IsSignedInGuard";
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PageNotFoundActivateGuard} from "./guard/page-not-found-activate-guard.service";
import {AuthorizationInterceptor} from "./services/authorization.interceptor";
import {NavBarModule} from "./pages/nav-bar/nav-bar.module";
import {NgFor} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PagesModule} from "./pages/pages.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
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
    NgFor,
    FormsModule,
    PagesModule,
    SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true
  }, AuthGuard, IsSignedInGuard, AuthenticationService, PageNotFoundActivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
