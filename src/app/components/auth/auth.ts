import { Component } from '@angular/core';
import { LoginForm } from './login-form/login-form';
import { RegisterForm } from './register-form/register-form';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BusAnimation } from '../Common/bus-animation/bus-animation';

@Component({
  selector: 'app-auth',
  imports: [LoginForm,RegisterForm,MatCardModule,CommonModule,MatButtonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class Auth {
  showLogin: boolean = true;

  toggleForm(showLogin: boolean) {
    this.showLogin = showLogin;
  }

}
