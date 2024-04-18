import { Subject, takeUntil } from 'rxjs';
import { WeatherDatas } from '../../../../models/interfaces/weatherDatas';
import { WeatherService } from './../../services/weather.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html'

})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$:Subject<void> = new Subject();
  InitialCityName = "Ilhéus";
  weatherDatas !: WeatherDatas;
  searchIcon = faMagnifyingGlass

  constructor(private weatherService: WeatherService){}
  ngOnInit(): void {
    this.getWeatherDatas(this.InitialCityName);
  }

  getWeatherDatas(cityNome: string): void{
    this.weatherService
    .getWeatherDatasService(cityNome)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response)=>{
        console.log(response);
        response && (this.weatherDatas = response)

      },
      error:(error)=>console.log(error)
    })
  }

  onSubmit(): void{
    this.getWeatherDatas(this.InitialCityName);
    this.InitialCityName = '';

  }

  //evita vazamento de memoria
  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }
}
