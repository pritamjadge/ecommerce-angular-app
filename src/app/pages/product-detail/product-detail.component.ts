import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/Product";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId!: number;
  product!: Product;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _productService: ProductService) {
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.productId = Number(param.get('id'));
        this.getProductDetail(this.productId);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getProductDetail(id: number) {
    this._productService.viewProductDetails(id).subscribe(productDetail => {
      this.product = productDetail;
    });
  }
}
