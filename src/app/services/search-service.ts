// search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Route {
  id: number;
  source: string;
  destination: string;
  distance: number;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = 'http://localhost:5241/api/Routes';

  constructor(private http: HttpClient) {}

  getRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(this.apiUrl);
  }

  getRouteById(id: number): Observable<Route> {
    return this.http.get<Route>(`${this.apiUrl}/${id}`);
  }
}