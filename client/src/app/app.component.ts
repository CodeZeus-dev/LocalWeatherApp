import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { LocationService } from './location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  city: string;
  temperature: string;
  weatherIcon: string;
  celsiusState: boolean = true;
  fahrenheitState: boolean = false;
  tempUnit: string = '°C';

  constructor(
    private appService: AppService,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.locationService
      .getPosition()
      .then((pos) => {
        this.appService
          .getCurrentWeather(pos.lat, pos.lng)
          .subscribe((data) => {
            this.city = data.name;
            this.temperature = Math.round(parseFloat(data.main.temp)).toString();
            this.weatherIcon = data.weather[0].icon;
          })
      });
  }

  getTempC(): void {
    if (this.celsiusState) return;
    this.temperature = (Math.round((parseInt(this.temperature) - 32))/1.8).toString();
    this.tempUnit = '°C';
    this.celsiusState = true;
    this.fahrenheitState = false;
  }

  getTempF(): void {
    if (this.fahrenheitState) return;
    this.temperature = (Math.round(parseInt(this.temperature) * 1.8 + 32)).toString();
    this.tempUnit = '°F';
    this.fahrenheitState = true;
    this.celsiusState = false;
  }

}
