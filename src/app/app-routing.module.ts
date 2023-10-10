import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/nav-bar/login/login.component";
import {ProductListComponent} from "./pages/view-products/product-list.component";
import {AuthGuard} from "./guard/auth.guard";
import {IsSignedInGuard} from "./guard/IsSignedInGuard";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {PageNotFoundActivateGuard} from "./guard/page-not-found-activate-guard.service";
import {ProductDetailComponent} from "./pages/product-detail/product-detail.component";
import {SignUpComponent} from "./pages/nav-bar/sign-up/sign-up.component";
import {CartComponent} from "./pages/cart/cart.component";

const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: ProductListComponent,
    data: {breadcrumb: 'Home'}
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
    component: ProductDetailComponent,
    data: {breadcrumb: 'Product Detail'}
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'dashboard/cart',
    component: CartComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: 'Cart'}
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
