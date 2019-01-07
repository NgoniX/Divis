import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  responseData : any;
  dataInfo: any;
  signup: {name?: string, surname?: string, phone?: string, email?: string, 
           username?: string, password?: string} = {};

  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData, 
              private authService: AuthServiceProvider) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {

          //Api connections
        this.authService.postData(this.signup, "signup").subscribe((result) =>{
        this.responseData = result;

        if(JSON.stringify(this.responseData.error)){
          //show errors
          this.dataInfo = JSON.stringify(this.responseData.error).replace(/^"(.*)"$/, '$1');
        }

        else {
         localStorage.setItem('userInfo', JSON.stringify(this.responseData) )
         this.userData.signup(this.signup.username);
         this.navCtrl.push(HomePage);
        }

        
        console.log(this.signup);
        }, (err:any) => {
          //Connection failed message
          console.log(err);
        });
      
    }

    else {
      console.log("Give valid information.");
    }
  }
}
