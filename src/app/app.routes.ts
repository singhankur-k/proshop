import { Routes } from '@angular/router';
import { Search } from './components/search/search';
import { Booking } from './components/booking/booking';
import { SeatMapComponent } from './components/seat/seat';
import { PassengerFormComponent } from './components/passenger-detail/passenger-detail';
import { Auth } from './components/auth/auth';
import { BusListComponent } from './admin module/components/bus-list/bus-list';
import { Main } from './admin module/components/main-layout/main/main';

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
        path:'auth',
        component:Auth
    },
    {
        path:'admin',
        component: BusListComponent
    },
    {
        path:'main',
        component:Main
    }
];
