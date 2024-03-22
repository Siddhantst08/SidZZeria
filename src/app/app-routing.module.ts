import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { PizzaHeaderComponent } from './components/pizza-header/pizza-header.component';
import { PizzaContentComponent } from './components/pizza-content/pizza-content.component';
import { LoginComponent } from './components/login/login.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SuccessComponent } from './components/success/success.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',component:PizzaContentComponent},
  {path:'login',component:LoginComponent},
  {path:'menu',component:MenuComponent, canActivate:[AuthGuard]},
  {path:'cart',component:ShoppingCartComponent, canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent},
  {path:'checkout', component:CheckoutComponent, canActivate:[AuthGuard]},
  {path:'success', component:SuccessComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
