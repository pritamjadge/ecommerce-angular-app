import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from "./nav-bar.component";
import {LoginComponent} from "./login/login.component";
import {ReactiveFormsModule} from '@angular/forms';

import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    NavBarComponent,
    LoginComponent,
  ],
  exports: [
    NavBarComponent
  ]

})
export class NavBarModule {
}
