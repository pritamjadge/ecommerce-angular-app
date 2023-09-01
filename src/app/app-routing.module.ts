import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/nav-bar/login/login.component";
import {ProductListComponent} from "./components/view-products/product-list.component";
import {AuthGuard} from "./guard/auth.guard";
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {IsSignedInGuard} from "./guard/IsSignedInGuard";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {PageNotFoundActivateGuard} from "./guard/page-not-found-activate-guard.service";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";

const routes: Routes = [

  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full'
  },
  {
    path: 'product',
    component: ProductListComponent,
    // canActivate: [AuthGuard],
    // children: [
    //   {
    //     path: 'employeeList',
    //     component: EmployeeListComponent,
    //     canActivate: [AuthGuard],
    //   },
    // ]
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    canActivate: [PageNotFoundActivateGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
