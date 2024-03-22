import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';

const API_URL_PRODUCTS = "http://localhost:3001/products"
const API_URL_CART = "http://localhost:3001/cartItems"

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // val:any=false

  //Getting the product info from APIs
  getProducts() {
    return this.http.get<Product[]>(API_URL_PRODUCTS);
  }
  getProductsCart() {
    return this.http.get<Product[]>(API_URL_CART);
  }

  getProductById(id:any){
    return this.http.get<Product>(`${API_URL_CART}/${id}`);
   }

  //Adding Product to cart
  addProduct(payload: Product) {
    // console.log("hi");
    payload.quantity = 1
      return this.http.post<Product>(API_URL_CART, payload)
    
    
     

  }

  updateProduct(id:any, payload: Product) {
    // console.log("hi");

      // payload.quantity += 1
      return this.http.put<Product>(API_URL_CART+`/${id}`, payload)
     

  }


  //Deleting Prodcut from Cart
  delProduct(id: any) {
    return this.http.delete(`${API_URL_CART}/${id}`)
  }

  // validation() {
  //   console.log(this.val);
    
  //   this.val=true
  // }

  
}
