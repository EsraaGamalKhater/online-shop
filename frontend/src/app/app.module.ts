import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { HeroComponent } from './hero/hero.component';
import { DescriptionPipe } from './pipes/description.pipe';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProfileComponent } from './profile/profile.component';
import { ReviewComponent } from './review/review.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    FooterComponent,
    HeroComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginComponent,
    SignupComponent,
    HttpClientModule,
    HeaderComponent,
    ForgetpasswordComponent,
    BestSellerComponent,
    DescriptionPipe,
    ProductsComponent,
    ProfileComponent,
    ProductDetailsComponent,
    ReviewComponent,
    CartComponent,
    WishlistComponent,
    OrdersComponent,
  
    CommonModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
