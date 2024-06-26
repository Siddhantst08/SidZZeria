import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../products/product.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private prod:ProductService, private route:Router) {

  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {

    if(localStorage.getItem("prodVal") != "1") {
      alert('You are not allowed to view this page. You are redirected to login Page');
      this.route.navigateByUrl("/login")
      return false;
    }
    //this.prod.val = false
    return true;
  }

}
