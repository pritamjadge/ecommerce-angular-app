import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/Product";
import {HttpErrorResponse} from "@angular/common/http";
import {BreadcrumbService} from "../../services/breadcrumb.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId: number | undefined;
  product!: Product;
  productNotFoundMessage: string | undefined;
  isLoading = false;

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _productService: ProductService,
              private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.productId = Number(param.get('id'));
        this.getProductDetails(this.productId);
      }
    });
    this.breadcrumbService.setBreadcrumb(['Dashboard', 'Product']);
  }

  getProductDetails(productId: number) {
    this.isLoading = true;
    this._productService.viewProductDetails(productId).subscribe({
      next: (productDetail) => {
        if (productDetail != null || productDetail != "") {
          this.isLoading = false;
          this.product = productDetail;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.isLoading = false;
        this.productNotFoundMessage = err.error;
      }
    });
  }
}
