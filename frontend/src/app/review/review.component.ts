import { Component ,OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ReviewService } from '../services/review.service';
import { Reviews } from '../interfaces/reviews';
import { Pagination } from '../interfaces/pagination';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl:'./review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy {
  subscription: any;
  reviews: Reviews[] = [];
  pagination: Pagination = {};
  page: number = 1;
  productImage: string = '';
  
  constructor(private _AuthService: AuthService, private _ReviewService: ReviewService) { }

  loadReviews() {
    this.subscription = this._ReviewService.getReviews(50, this.page).subscribe({
      next: (res) => {
        this.reviews = res.data;
        this.pagination = res.pagination;
        console.log(this.reviews);
      },
      error: (err) => { }
    })
  }

  deleteReview(reviewId: string) {
    const confirmation = confirm('Are you sure you want to delete this review?');
    
    if (confirmation) {
      this._ReviewService.deleteReview(reviewId).subscribe({
        next: (res) => {
          this.loadReviews();
          alert('Review deleted');
        },
        error: (err) => { }
      });
    } else {
      alert('Review deletion canceled');
    }
  }

  editReview(review: Reviews) {
    review.isEditing = true; 
  }

  updateReview(review: Reviews) {
    this._ReviewService.updateReview(review._id!, review).subscribe({
      next: (res) => {
        review.isEditing = false; 
        alert('Review updated successfully');
        this.loadReviews();
      },
      error: (err) => {
        alert('Error updating review');
        review.isEditing = false; 
      }
    });
  }
  
  changePage(page: number) {
    this.page = page;
    this.loadReviews();
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productImage = this._ReviewService.productImage;
    this.loadReviews();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
