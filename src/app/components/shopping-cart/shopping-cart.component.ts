import { Component, EventEmitter, OnInit } from '@angular/core';
import { ProductService } from 'src/app/products/product.service';
import { Product } from 'src/app/products/product';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Product[] = [];

  // item: any = {
  //   id: 0,
  //   name: "",
  //   price: 0,
  //   image: "",
  //   quantity: 0
  // }

  //id = null
  itemsArr: any = []
  priceArr:any = []
  totalAmount: any = 0
  constructor(private prod: ProductService, private router: Router, private activated_router: ActivatedRoute) {
    // this.activated_router.params.subscribe({
    //   next:(val)=>{
    //     this.id = val['id']
    //     console.log(this.id);

    //   }
    // })
  }
  ngOnInit(): void {
    this.prod.getProductsCart()
      .subscribe({
        next: data => {
          // console.log(data)
          this.cartItems = data;

          for (let i = 0; i < this.cartItems.length; i++) {


            this.prod.getProductById(this.cartItems[i].id).subscribe({
              next: (data) => {

                this.itemsArr.push(data.quantity)
                this.priceArr.push(data.price)
              }
            })
          }
          console.log(this.itemsArr);

        },
        error: err => {
          console.log(err)
        }
      })


  }



  itemsArrAll() {

    // if (this.itemsArr.length == 0) {
    //   for (let i = 0; i < this.itemsArr.length; i++) {
    //     this.totalAmount += this.itemsArr[i].price
    //   }
    // }


    
      for (let i = 0; i < this.itemsArr.length; i++) {
        this.totalAmount += this.itemsArr[i] * this.priceArr[i]
      }
    

    localStorage.setItem("totalAmount", this.totalAmount)

  }






  delProd(id: any) {
    this.prod.delProduct(id)
      .subscribe({
        next: data => {
          if (data) {
            alert("Product Deleted");
            this.cartItems = this.cartItems.filter(prod => prod.id != id);
            window.location.reload();
          }
        },
        error: err => {
          console.log(err)
        }
      })
  }



}
