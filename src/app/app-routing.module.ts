import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./shared/page-not-found/page-not-found.component";
import {PageNotFoundActivateGuard} from "./guard/page-not-found-activate-guard.service";

const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/nav-bar/nav-bar.module').then(m => m.NavBarModule) // use for login and sign-in
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
