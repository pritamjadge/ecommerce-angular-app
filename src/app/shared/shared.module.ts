import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    BreadcrumbComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [BreadcrumbComponent]
})
export class SharedModule {
}
