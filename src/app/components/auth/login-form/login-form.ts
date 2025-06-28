import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../../services/search-service';
import { subscribe } from 'diagnostics_channel';
@Component({
  selector: 'app-login-form',
  imports: [  ReactiveFormsModule,MatFormFieldModule, MatInputModule,
    MatButtonModule,CommonModule,    MatCardModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm {
  
  
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: SearchService) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  submit() {
    
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
      this.loginService.loginAuth(this.loginForm.value).subscribe((response)=>{
        console.log(response,"Successfully");

      })
    }
  }
}
