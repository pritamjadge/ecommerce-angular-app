import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from "./nav-bar.component";
import {LoginComponent} from "./login/login.component";
import {ReactiveFormsModule} from '@angular/forms';

import { RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    NavBarComponent,
    LoginComponent,
    SignUpComponent,
    BreadcrumbComponent
  ],
  exports: [
    NavBarComponent,
    BreadcrumbComponent
  ]

})
export class NavBarModule {
}
