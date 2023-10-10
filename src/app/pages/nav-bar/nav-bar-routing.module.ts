import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {IsSignedInGuard} from "../../guard/IsSignedInGuard";

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [IsSignedInGuard]},
  {path: 'sign-up', component: SignUpComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavBarRoutingModule {
}
