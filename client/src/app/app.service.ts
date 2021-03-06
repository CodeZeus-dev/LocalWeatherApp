import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  constructor(private http: HttpClient, ) {}

  getCurrentWeather(lat: string, lon: string): any {
    return this.http.get(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`);
  }
}
