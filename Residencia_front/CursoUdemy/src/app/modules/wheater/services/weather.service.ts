import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apikey =  '6a5d20728a351f2737b1d860cf254466';

  constructor(private http : HttpClient) { }

  getWeatherDatasService(cityName: string): Observable<any>{
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&mode=json&appid=${this.apikey}`,
      {});
  }
}
