import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../services/breadcrumb.service";
import {AuthenticationService} from "../../services/authentication.service";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../models/CartItem";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems!: CartItem[];
  quantityOptions: number[] = [1, 2, 3, 4, 5, 6];

  cartItemTotalAmount: number | undefined;
  discountedAmountOnCartItems : number | undefined;
  cartItemGrandTotalAmount: number | undefined;

  constructor(private breadcrumbService: BreadcrumbService,
              private authService: AuthenticationService,
              private cartService: CartService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumb(['Dashboard', 'Cart']);
    this.getCartItems();
  }

  getCartItems() {
    if (!this.authService.isLoggedIn())
      return false;
    else {
      const username = this.authService.getUserName();
      this.cartService.getCartItems(username).subscribe({
        next: cartItemsResp => {
          this.cartItems = cartItemsResp;
          console.log(this.cartItems);
          this.cartItemTotalAmount = this.totalAmountOfCartItems(this.cartItems);
          //applied 5 % discount on total cart amount
          this.discountedAmountOnCartItems = +(this.cartItemTotalAmount * 5 / 100).toFixed(2);
          this.cartItemGrandTotalAmount = +(this.cartItemTotalAmount - (this.cartItemTotalAmount * 5 / 100)).toFixed(2);
        }
      })
      return true;
    }
  }

  totalAmountOfCartItems(cartItems: CartItem[]) {
    return cartItems.reduce((total, item) => {
      return (item.productPrice * item.productQty) + total;
    }, 0);
  }

  removeCartItem(cartId: number) {
    if (!this.authService.isLoggedIn()) {
      return false;
    } else {
      return Swal.fire({
        title: 'Are you sure?',
        text: "You want to delete this item from the cart!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          const username = this.authService.getUserName();
          return this.cartService.removeCartItem(cartId, username).subscribe(resp => {
            console.log(resp);
            if (resp !== null && resp !== '') {
              this.getCartItems();
              this.cartService.getCartCount(username).subscribe(count => {
                this.cartService.setAddToCartCount(count);
              });
              Swal.fire({
                title: 'Deleted!',
                text: 'Item has been deleted.',
                icon: 'success',
                timer: 1000, // Automatically close after 2 seconds (adjust as needed)
                showConfirmButton: false,
                /*allowOutsideClick: false*/
              });
            }
          });
        }
        return false;
      });
    }
  }

  updateProductQuantity(productIndex: any) {
    const updatedQuantity = this.cartItems[productIndex].productQty;
    const cartId = this.cartItems[productIndex].cartId;
    const username = this.authService.getUserName();
    this.cartService.updateProductQuantity(updatedQuantity, cartId).subscribe({
      next: (resp) => {
        console.log(resp);
        this.getCartItems();
        this.cartService.getCartCount(username).subscribe(count => {
          this.cartService.setAddToCartCount(count);
        });
        this.toastrService.success(resp, "Success");
      },
      error: (err: HttpErrorResponse) => {
        this.toastrService.error(err.message, "Error");
      }
    });
  }

}
