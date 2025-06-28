import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private http: HttpClient) { }


  private apiBusUrl='http://localhost:5241/api/Bus'

  getAllBuses():Observable<any>{
      return this.http.get<any>(this.apiBusUrl)
  }
}
