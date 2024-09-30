import { Component,OnDestroy, OnInit  } from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Products } from '../interfaces/products';
import { DescriptionPipe } from '../pipes/description.pipe'; 
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [CommonModule, RouterLink,DescriptionPipe],
  templateUrl:'./best-seller.component.html',
  styleUrls: ['./best-seller.component.scss']
})
export class BestSellerComponent implements OnInit, OnDestroy{

  subscription: any;
  products: Products[] = [];
  imgDomain: string = '';
  constructor(private _ProductsService: ProductsService,private _CartService: CartService) { }

  loadProducts() {
    this.subscription = this._ProductsService.getAllProducts(16, 1, '-sold', '').subscribe({
      next: (res) => { this.products = res.data; },
      error: (err) => { console.error(err); }
    });
  }

  addToCart(productId: string) {
    this._CartService.addToCart(productId).subscribe({
      next: (res) => { alert('product added to your cart') },
      error: (err) => { }
    })
  }

  ngOnInit(): void {
    this.imgDomain = this._ProductsService.productImages;
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
