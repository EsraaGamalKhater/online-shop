import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../interfaces/products';
import { Pagination } from '../interfaces/pagination';
import { DescriptionPipe } from '../pipes/description.pipe';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [DescriptionPipe, CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscription: any;
  products: Products[] = [];
  filteredProducts: Products[] = []; 
  imgDomain: string = '';
  pagination: Pagination = {};
  limit: number = 16;
  page: number = 1;
  sort: string = '-createdAt';
  searchQuery: string = ''; 
  categories: any[] = [];
  subcategories: any[] = [];
  selectedCategory: string = '';
  selectedSubcategory: string = '';

  constructor(private _ProductsService: ProductsService, private _CartService: CartService) { }

  loadProducts() {
    this.subscription = this._ProductsService.getAllProducts(this.limit, this.page, this.sort, this.searchQuery)
      .subscribe({
        next: (res) => {
          this.products = res.data;
          this.filteredProducts = res.data; 
          this.pagination = res.pagination;
        },
        error: (err) => { console.error(err); }
      });
  }

  changePage(page: number) {
    this.page = page;
    this.loadProducts();
  }

  searchProducts(search: string) {
    this.searchQuery = search.trim();
    if (this.searchQuery === '') {
      this.filteredProducts = [...this.products]; 
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name && product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
  

  addToCart(productId: string) {
    this._CartService.addToCart(productId).subscribe({
      next: () => { alert('Product added to your cart!'); },
      error: (err) => { console.error(err); }
    });
  }

  ngOnInit(): void {
    this.imgDomain = this._ProductsService.productImages;
    this.loadProducts();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
