// search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { create } from 'domain';

export interface Route {
  id: number;
  source: string;
  destination: string;
  distance: number;
  date:string;
}

export interface RouteApiResponse {
  status: boolean;
  data: any[];
  statusCode: number;
  errors: any;
}
export interface BookingDto {
  scheduleId: number;
  seatNumbers: string[];
  passengerName: string;
  bookingDate: string;
}

export interface Root {
  id: number
  seatNumber: string
  type: string
  status: string
  price: number
  deck: string
  section: string
  busId: number
  bus: Bus
}

export interface Bus {
  id: number
  busNumber: string
  busName: string
  busType: string
  seatCapacity: number
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiSeatLayoutUrl= 'http://localhost:5241/api/SeatLayout/all';

  private apiSchedulesUrl = 'http://localhost:5241/api/Schedules/all';
  private apiBookingsUrl ='http://localhost:5241/api/Booking'
  private apiUrl = 'http://localhost:5241/api/Routes';
  private apiSeatStatusUrl ='http://localhost:5241/api/SeatStatus'
  private apiLoginAuthUrl ='http://localhost:5241/api/Login'

  constructor(private http: HttpClient) {}

  getSeatLayout(): Observable<RouteApiResponse>{
    return this.http.get<RouteApiResponse>(this.apiSeatLayoutUrl);
  }
  getRoutes(): Observable<RouteApiResponse> {
    return this.http.get<RouteApiResponse>(this.apiUrl);
  }

  getAllSchedules(): Observable<RouteApiResponse> {
    return this.http.get<RouteApiResponse>(this.apiSchedulesUrl);
  }

  createBooking(data: BookingDto): Observable<any> {
    return this.http.post<any>(`${this.apiBookingsUrl}/BookSeat`, data);
  }

  getRouteById(id: number): Observable<Route> {
    return this.http.get<Route>(`${this.apiUrl}/${id}`);
  }

  getSeatStatus(id: number):Observable<any>{
     return this.http.get<any>(`${this.apiSeatStatusUrl}/${id}`);
  }

  loginAuth(data:any):Observable<any>{
    return this.http.post<any>(this.apiLoginAuthUrl,data);
  }
}