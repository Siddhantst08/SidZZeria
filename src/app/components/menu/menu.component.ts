import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/products/product.service';
import { Product } from 'src/app/products/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: Product[] = [];
  cartItems: Product[] = [];
  //cartItems: Product[] = [];

  id: any;
  status: boolean = false
  obj: any = {
    id: 0,
    name: '',
    price: 0,
    image: '',
    // quantity: 1
  }

  constructor(private prod: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.prod.getProducts()
      .subscribe({
        next: data => {
          // console.log(data)
          this.menuItems = data;
          // this.menuItems.quantity
        },
        error: err => {
          console.log(err)
        }
      })

    this.prod.getProductsCart()
      .subscribe({
        next: data => {
          // console.log(data)
          this.cartItems = data;
          // this.menuItems.quantity
        },
        error: err => {
          console.log(err)
        }
      })
  }

  forLoop(itemId:any):boolean {
    for(let i = 0; i < this.cartItems.length; i++) {
      if(this.cartItems[i].id == itemId) {
        return false
      }
    }
    return true
  }

  guiderFunction(idx: any, itemId:any) {
    this.obj = this.menuItems[idx]
    console.log(this.obj.quantity);
    
    let objId = this.obj.id

    if (this.obj.quantity == undefined && this.forLoop(itemId)) {
      // console.log("running if");
      
      this.postData(idx)
    }
    else {
      // console.log("runnung else");
      
      this.updateData(idx, objId)
    }
  }

  postData(idx: any) {

    //Adding new Item to cart
    this.prod.addProduct(this.obj)
      .subscribe({
        next: data => {
          alert("Congrats, Item Added !!");
          this.router.navigateByUrl("/menu")
            .then(() => {
              window.location.reload();
            });
        },
        error: err => {
          console.log(err);
        }
      })
  }


  updateData(idx: any, objId: any) {


    this.cartItems.forEach(element => {
      if (element.id == objId) {
        this.obj = element
        this.obj.quantity += 1
        this.prod.updateProduct(this.obj.id, this.obj)
          .subscribe({
            next: data => {
              alert("Item increased by 1");
              this.router.navigateByUrl("/menu")
            },
            error: err => {
              console.log(err)
            }
          })
      }
    });
  }
}

// poostData(idx: any) {

//   this.prod.addProduct(this.obj)
//     .subscribe({
//       next: data => {
//         alert("Congrats, Item Added !!");
//         this.router.navigateByUrl("/menu")
//           .then(() => {
//             window.location.reload();
//           });
//       },
//       error: err => {

//         console.log(`inside error ${this.obj.quantity}`);
//         this.obj.quantity = newQuantity
//         // console.log(this.obj.id);
//         // console.log(this.obj);
//         // console.log(this.obj.quantity);



//         this.prod.updateProduct(this.obj.id, this.obj)
//           .subscribe({
//             next: data => {
//               alert("Item increased by 1");
//               this.router.navigateByUrl("/menu")
//             },
//             error: err => {
//               console.log(err)
//             }
//           })

//         console.log("heeloo i catch you");
//         // this.obj.quantity += 1;
//         console.log(this.obj.quantity);

//         // alert("Quantity increased")
//         // console.log(err)
//       }
//     })
// }



