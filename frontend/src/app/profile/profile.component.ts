import { Component,OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  implements OnInit, OnDestroy{
  subscription: any;
  user: any = {};
  userImage: string = '';
  userPhoto: any;
  username: string = '';
  changePasswordForm = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  })
  constructor(private _AuthService: AuthService, private _ProfileService: ProfileService) { };

  getImage(event: any) {
    const image = event.target.files[0];
    if (image) {
      this.userPhoto = image;
    }
  }

  loadUser() {
    this.subscription = this._ProfileService.getUser().subscribe({
      next: (res) => {
        this.user = res.data;
      },
      error: (err) => { }
    })
  }

  updateUser() {
    const userForm = new FormData();
    if (this.username) {
      userForm.append('name', this.username);
    }
    if (this.userPhoto) {
      userForm.append('image', this.userPhoto);
    }
    this._ProfileService.updateUser(userForm).subscribe({
      next: () => {
        this.loadUser();
        alert('user data updated')
      },

    })
  }

  changePassword(formData: FormGroup) {
    this._ProfileService.changeUserPassword(formData.value).subscribe({
      next: (res) => {
        alert('your password changed')
        localStorage.setItem('user', res.token);
        this._AuthService.saveCurrentUser();
      },
      error: () => { }
    })
  }
  deleteAccount() {
    if (confirm('Are you sure you want to delete your account?.')) {
      this._ProfileService.deleteUser().subscribe({
        next: () => {
          alert('Your account has been deleted.');
          localStorage.removeItem('user');  
          this._AuthService.logout(); 
        },
        error: () => {
          alert('An error occurred while deleting your account.');
        }
      });
    }
  }
  
  ngOnInit(): void {
    this._AuthService.checkToken();
    this.userImage = this._ProfileService.userImage;
    this.loadUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

