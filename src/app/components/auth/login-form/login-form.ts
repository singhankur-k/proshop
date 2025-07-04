import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../../services/search-service';
import { subscribe } from 'diagnostics_channel';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChangeDetectorRef } from '@angular/core';

import { log } from 'console';
import { isatty } from 'tty';
@Component({
  selector: 'app-login-form',
  imports: [  ReactiveFormsModule,MatFormFieldModule, MatInputModule,
    MatButtonModule,CommonModule,    MatCardModule,MatProgressSpinnerModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm implements OnInit {
  
  
  loginForm: FormGroup;
  data: any = {}
  returnUrl :string=''
  isLoading=false;
 cd= inject(ChangeDetectorRef)
  toaster = inject(ToastrService);
  constructor(private fb: FormBuilder, private loginService: SearchService,private router: Router, private route:ActivatedRoute) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';

  }

  // submit() {
    
  //   if (this.loginForm.valid) {
  //     console.log('Login Data:', this.loginForm.value);
  //     this.loginService.loginWithCookie(this.loginForm.value).subscribe((response)=>{
       
         
  //       if(this.loginService.isAuthenticatedFromServer()){
  //         const TOKEN_KEY = 'auth_token';
  //         localStorage.setItem(TOKEN_KEY,response.token)
         
  //         this.router.navigateByUrl(this.returnUrl);
        
  //       // this.router.navigate([`/dashboard`]);
  //       }
      
  //     }
  //   )
  
  //   }
  // }

  submit(): void {
    if (this.loginForm.invalid) {
      return;
    }
  
    this.isLoading = true;
    const loginData = this.loginForm.value;
    console.log('Login Data:', loginData);
    
    this.loginService.loginWithCookie(loginData).subscribe({
      next: (response) => {
        // Simulate loading delay (optional, e.g., 1.5s)
        setTimeout(() => {
          this.isLoading = false;
          this.cd.detectChanges();
          if (this.loginService.isAuthenticatedFromServer()) {
            this.toaster.success(`Welcome, ${response.userName}`);
            this.router.navigateByUrl(this.returnUrl);
          } else {
            console.error('Login succeeded but authentication flag is false');
            this.toaster.warning('Login validation failed on the client side.');
          }
        }, 15); // ⏱️ You can adjust the delay as needed
      },
      error: (err) => {
        
        this.isLoading = false;
        this.cd.detectChanges();
        console.error('Login request failed:', err);
        this.toaster.error('Login request failed. Please try again.');
      }
    });
  }
  
}
