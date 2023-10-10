import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from "./nav-bar.component";
import {LoginComponent} from "./login/login.component";
import {ReactiveFormsModule} from '@angular/forms';

import {RouterModule} from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import {NavBarRoutingModule} from "./nav-bar-routing.module";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NavBarRoutingModule
  ],
  declarations: [
    NavBarComponent,
    LoginComponent,
    SignUpComponent,
  ],
  exports: [
    NavBarComponent,
  ]

})
export class NavBarModule {
}
