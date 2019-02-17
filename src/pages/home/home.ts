import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, Platform } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { HomeWeatherPage } from './../home-weather/home-weather';
import { Network } from '@ionic-native/network';
import { Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  connected: Subscription;
  disconnected: Subscription;

 // The items array to populate with data is created
  articles: any;
  articleIndex = 0;
  queryText = '';

  groups: any = [];
  slides: string[];
  errorMessage: string;

  constructor(
  	public navCtrl: NavController,
  	public loadingController: LoadingController,
    public platform: Platform,
    private toast: ToastController,
    private network: Network
  	) {

  }

  // load news data from api on home page
  ionViewDidLoad() {

  }



  //display network status
  ionViewDidEnter() {

    this.connected = this.network.onConnect().subscribe(data => {
    console.log(data)
    this.displayNetworkUpdate(data.type);
  }, error => console.error(error));

    this.disconnected = this.network.onDisconnect().subscribe(data => {
    console.log(data)
    this.displayNetworkUpdate(data.type);
  }, error => console.error(error));

  }

  ionViewWillLeave(){
  this.connected.unsubscribe();
  this.disconnected.unsubscribe();
  }
  
  // go to news detail
  // newsDetail(newsData: any) {
  //   this.navCtrl.push(AboutPage, {
  //     title: newsData.title,
  //     news: newsData
  //   });
  // }


   //network status
   displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type;
    this.toast.create({
    message: `You are now ${connectionState} via ${networkType}`,
    duration: 5000
  }).present();
  }

  goToWeather() {
    this.navCtrl.push(HomeWeatherPage);
  }


}
