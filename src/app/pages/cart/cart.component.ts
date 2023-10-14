import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../services/breadcrumb.service";
import {AuthenticationService} from "../../services/authentication.service";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../models/CartItem";
import Swal from "sweetalert2";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] | undefined;
  quantityOptions: number[] = [1, 2, 3, 4, 5, 6];

  cartItemTotalAmount: number | undefined;

  constructor(private breadcrumbService: BreadcrumbService,
              private authService: AuthenticationService,
              private cartService: CartService) {
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

}
