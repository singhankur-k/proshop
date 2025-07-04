import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { SearchService } from '../../../../services/search-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule,MatMenuModule,MatDividerModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {
   service =inject(SearchService);
   router= inject(Router)

  username: string='admin'
  data={}

  logout(){
  this.service.clearCookie().subscribe((response)=>{
    if(response){
      this.router.navigateByUrl('/login');
    }
    console.log("Error occured while clearing cookies");
  });

  }

  openSettings(){

  }
}
