import { Routes } from '@angular/router';
import { Search } from './components/search/search';
import { Booking } from './components/booking/booking';

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
    }
];
