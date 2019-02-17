import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController} from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home-weather',
  templateUrl: 'home-weather.html'
})
export class HomeWeatherPage {
  weather: any;
  location: {
    state: string,
    city: string
  }

  public locationList: Array<any> = [
    {city: 'Harare', state: 'ZW'},
    {city: 'Bulawayo', state: 'ZW'},
    {city: 'Mutare', state: 'ZW'},

  ]

  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private weatherProvider: WeatherProvider,
    private storage: Storage) {
  }

  ionViewWillEnter() {

    this.storage.get('location').then((val) => {
      if (val != null) {
        this.location = JSON.parse(val);

      } else {
        this.location = {
          state: 'ZW',
          city: 'Harare'
        }
      }

      this.getWeather(this.location)

    });

  }

  public getWeather(location) {

    // Create the popup
    let loading = this.loadingCtrl.create({
      content: 'Loading data...'
    });

    // Show the popup
    loading.present();

    if (typeof location === 'string') {
      this.location = JSON.parse(location);
      console.log(this.location);
    } else {
      this.location = location;
    }

    this.weatherProvider.getWeather(this.location.state, this.location.city)
    .subscribe((weather: any) => {
      this.weather = weather.current_observation;
      loading.dismiss();
    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'No Network Connection Detected',
        buttons: ['OK']
      });
      alert.present();
      loading.dismiss();
    });

  }

}
