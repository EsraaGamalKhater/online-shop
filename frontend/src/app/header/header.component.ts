import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone:true,
  imports:[RouterLink,CommonModule],
  templateUrl:'./header.component.html', 
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLogin: boolean = false;
  dropdownOpen: boolean = false;
  constructor(private _AuthService: AuthService) {
    this._AuthService.currentUser.subscribe({
      
      next: () => {
        console.log('User logged in:', this.isLogin);
        if (this._AuthService.currentUser.getValue() !== null) {
          this.isLogin = true
        } else { this.isLogin = false }
      }
      
    })
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen; 
  }
  logout() { 
    this._AuthService.logout();
  }
  

}
