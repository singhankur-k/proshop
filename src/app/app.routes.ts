import { Routes } from '@angular/router';
import { Search } from './components/search/search';
import { Booking } from './components/booking/booking';
import { SeatMapComponent } from './components/seat/seat';
import { PassengerFormComponent } from './components/passenger-detail/passenger-detail';
import { Auth } from './components/auth/auth';
import { BusListComponent } from './admin module/components/bus-list/bus-list';
import { Main } from './admin module/components/main-layout/main/main';
import { authGuard } from './components/auth/auth-guard/auth-guard-guard';
import { BusFormComponent } from './admin module/components/bus-form/bus-form';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'search',
        pathMatch: 'full'
    },
    {
        path:'search',
        component: Search
    },
    {
        path:'booking',
        component:Booking
    },
    {
        path:'seat/:id',
        component: SeatMapComponent
    },
    {
        path:'passenger',
        component: PassengerFormComponent
    },
    {
        path:'login',
        component:Auth
    },
   
   
    {
        path: 'dashboard',
        component: Main,
        canActivate: [authGuard],
        // canActivateChild:[authGuard],
        children: [
        
          { path: 'buses', 
            component: BusListComponent
         },
         {
            path: 'buses/add',
            component: BusFormComponent
         }
         
        ]
      },

      { path: '**', redirectTo: 'login' }

     

];
