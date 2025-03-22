import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLogin: boolean = false;
  sidebarOpen: boolean = false;

  constructor(private _AuthService: AuthService, private router: Router) {
    this._AuthService.currentUser.subscribe({
      next: (user) => {
        this.isLogin = !!user;
      }
    });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  navigateTo(route: string) {
    this.router.navigate([route]).then(() => {
      this.closeSidebar();
    });
  }

  logout() {
    this._AuthService.logout();
    this.router.navigate(['/login']).then(() => {
      this.closeSidebar();
    });
  }
}