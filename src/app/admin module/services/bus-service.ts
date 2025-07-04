import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface BusDto {
  busNumber: string
  busName: string
  busType: string
  seatCapacity: number
  busStatus: boolean
  userId: number
}


@Injectable({
  providedIn: 'root'
})

export class BusService {

  constructor(private http: HttpClient) { }


  private apiBusUrl='http://localhost:5241/api/Bus'
  

  getAllBuses():Observable<any>{
      return this.http.get<any>(`${this.apiBusUrl}`,{ withCredentials: true })
  }

  AddNewBus(data:BusDto): Observable<any>{
    return this.http.post<any>(`${this.apiBusUrl}/Add`,data,{ withCredentials: true })
  }
}
