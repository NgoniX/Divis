import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ServicesdetailPage } from '../servicesdetail/servicesdetail';
import { ServicesDataProvider } from '../../providers/services-data/services-data';

@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

   // The items array to populate with data is created
  services: any;
  serviceIndex = 0;
  queryText = '';
  groups: any = [];

  constructor(
  	public navCtrl: NavController,
  	private servicesData: ServicesDataProvider,
  	public loadingController: LoadingController,
  	) {
  }

  ionViewDidLoad() {

    this.updateServices();

  }


  updateServices(){

    let loader = this.loadingController.create({
      content: "Getting service providers..."
    });
    loader.present();

    this.servicesData.getServices(this.serviceIndex, this.queryText)
    .subscribe((data:any) => {
        loader.dismiss();
        this.groups = data.groups;
        //print out articles
        console.log(this.groups);
    });

  }

  // go to service detail
  serviceDetail(serviceData: any) {
    // go to the service detail page
    // and pass in the service data
    this.navCtrl.push(ServicesdetailPage, {
      services: serviceData
    });
  }

}
