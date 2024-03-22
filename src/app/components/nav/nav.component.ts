import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/products/product.service';
import { CartService } from 'src/app/products/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  //cSize:any
  cSize: number = 0
  constructor(private prod: ProductService, private cartser: CartService, private router: Router) { }
  ngOnInit(): void {
    // this.cartser.cartsubject.subscribe((val:any)=>{
    //     this.cSize=val.length;
    // })

    this.prod.getProductsCart()
      .subscribe({
        next: data => {
          // console.log(data)
          this.cSize = data.length;
        },
        error: err => {
          console.log(err)
        }
      })
  }

  logOutUser() {
    localStorage.clear()
    this.router.navigateByUrl("/")
  }

}
