import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatPaginatorModule} from '@angular/material/paginator';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductListComponent} from './pages/view-products/product-list.component';
import {AuthGuard} from "./guard/auth.guard";
import {AuthenticationService} from "./services/authentication.service";
import {IsSignedInGuard} from "./guard/IsSignedInGuard";
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {PageNotFoundActivateGuard} from "./guard/page-not-found-activate-guard.service";
import {AuthorizationInterceptor} from "./services/authorization.interceptor";
import {NavBarModule} from "./pages/nav-bar/nav-bar.module";
import {ProductDetailComponent} from './pages/product-detail/product-detail.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {NgFor} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
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
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    NgFor,
    FormsModule,
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
