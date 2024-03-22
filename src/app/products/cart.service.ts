import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: Product[] = [];
  constructor(private prod: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.prod.getProductsCart()
      .subscribe({
        next: data => {
          console.log(data)
          this.cartItems = data;
        },
        error: err => {
          console.log(err)
        }
      })
  }
}
