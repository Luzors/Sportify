import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from '@sportify-nx/shared/api';

@Component({
  selector: 'sportify-nx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  subs!: Subscription | undefined;
  submitted = false;
  adminLogin = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required, 
        this.validEmail.bind(this),
      ]),
      password: new FormControl("", [
        Validators.required,
        this.validPassword.bind(this),
      ]),
    });

    this.subs = this.authService.getUserFromLocalStorage()
    .subscribe((user: IUser | null) => {
      if (user) {
        console.log('User already logged in > logging out');
        this.authService.logout();
      } else {

        const admin = this.authService.getAdminFromLocalStorage();
        if (admin) {
          console.log('Admin already logged in > logging out');
          this.authService.logout();   
        } else {
          console.log('No user or admin logged in > continuing to page');
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitted = true;
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      if(!this.adminLogin){
      this.authService
        .login(email, password)
        // .pipe(delay(1000))
        .subscribe((user) => {
          if (user) {
            console.log('Logged in');
            this.router.navigate(['/']);
          }
          this.submitted = false;
        }); } else {
          this.authService
          .adminLogin(email, password)
          // .pipe(delay(1000))
          .subscribe((admin) => {
            if (admin) {
              console.log('Logged in');
              this.router.navigate(['/']);
            }
            this.submitted = false;
          });
        }
    } else {
      this.submitted = false;
      console.error('loginForm invalid');
    }
  }

  validEmail(control: FormControl): { [s: string]: boolean }| null {
    const email = control.value;
    const regexp = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'
    );
    if (regexp.test(email) !== true) {
      return { email: false };
    } else {
      return null;
    }
  }

  validPassword(control: FormControl): { [s: string]: boolean } | null {
    const password = control.value;
    //cannot start with number
    const regexp = new RegExp('^[a-zA-Z]([a-zA-Z0-9]){2,14}');
    if (regexp.test(password) !== true) {
      return { password: false };
    } else {
      return null;
    }
  }
}
