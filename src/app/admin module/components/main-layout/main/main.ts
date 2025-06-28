import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet,SidebarComponent,NavbarComponent],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {

}
