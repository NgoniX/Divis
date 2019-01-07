import { SocialSharing } from '@ionic-native/social-sharing';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-servicesdetail',
  templateUrl: 'servicesdetail.html',
})
export class ServicesdetailPage {

  services: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public socialSharing: SocialSharing
    ) {

  	this.services = navParams.data.services;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesdetailPage');
  }

  //social sharing
  socialShare(name:any, email:any, image:any) {
    this.socialSharing.share(email, name, image, null).then(() => {
      console.log("shareSheetShare: Success");
    }).catch((err) => {
      console.error("shareSheetShare: "+err);
    });
  }

}
