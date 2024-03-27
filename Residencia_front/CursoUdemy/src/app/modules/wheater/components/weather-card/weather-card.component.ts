import { Component, Input } from '@angular/core';
import { WeatherDatas } from '../../../../models/interfaces/weatherDatas';
import { faTemperatureLow, faTemperatureHigh, faDroplet, faWind } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',

})
export class WeatherCardComponent  {
  @Input() weatherDatasInput!: WeatherDatas;

  minTemperatureIcon = faTemperatureLow;
  maxTemperatureIcon = faTemperatureHigh;
  humidityIcon = faDroplet;
  windIcon = faWind;
//  ngOnInit(): void {
//     console.log("dados recebido componente pai, Weather:", this.weatherDatasInput)
//   }
}
