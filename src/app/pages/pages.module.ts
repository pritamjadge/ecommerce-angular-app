import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {ProductListComponent} from "./view-products/product-list.component";
import {RouterModule} from '@angular/router';
import {PagesRoutingModule} from "./pages-routing.module";
import {CartComponent} from "./cart/cart.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";

@NgModule({
  declarations: [
    ProductListComponent,
    CartComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule,
    PagesRoutingModule
  ]
})
export class PagesModule {
}
