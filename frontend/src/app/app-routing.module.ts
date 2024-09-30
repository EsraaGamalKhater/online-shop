import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', title: 'Home', component: HomeComponent },
  { path: 'signup', title: 'Signup', loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent) },
  { path: 'login', title: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'forgetPassword', title: 'forget password', loadComponent: () => import('./forgetpassword/forgetpassword.component').then(m => m.ForgetpasswordComponent) },
  {
    path: 'products',
    children: [
      { path: '', title: 'Products', loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent) },
      { path: ':id', title: 'Product Details', loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent) },
    ]
  },
  // { path: 'myReviews', title: 'Reviews', loadComponent: () => import('./review/review.component').then(m => m.ReviewComponent) },
  { path: 'myReviews', title: 'Reviews', canActivate: [authGuard], loadComponent: () => import('./review/review.component').then(m => m.ReviewComponent) },
  { path: 'wishlist', title: 'wishlist', canActivate: [authGuard], loadComponent: () => import('./wishlist/wishlist.component').then(m => m.WishlistComponent) },
  { path: 'cart', title: 'cart', canActivate: [authGuard], loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent) },
  { path: 'myOrders', title: 'Orders', canActivate: [authGuard], loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent) },
  { path: 'profile', title: 'My Profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
  { path: '**', title: '404 Not Found', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
