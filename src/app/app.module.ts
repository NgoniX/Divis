import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ServicesPage } from '../pages/services/services';
import { AccountPage } from '../pages/account/account';
import { NewsdetailPage } from '../pages/newsdetail/newsdetail';
import { ServicesdetailPage } from '../pages/servicesdetail/servicesdetail';

import { LoginPage }  from '../pages/login/login';
import { SignupPage }  from '../pages/signup/signup';

import { CacheModule } from 'ionic-cache';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { UserData } from '../providers/user-data';
import { NetworkConnProvider } from '../providers/network-conn/network-conn';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ServicesDataProvider } from '../providers/services-data/services-data';
import { NewsDataProvider } from '../providers/news-data/news-data';

import { Badge } from '@ionic-native/badge';
import { Network } from '@ionic-native/network';

import { IonAffixModule } from 'ion-affix/dist';
import { ParallaxHeaderDirective } from '../directives/parallax-header/parallax-header';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MomentModule } from 'angular2-moment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    AboutPage,
    NewsdetailPage,
    ServicesdetailPage,
    ContactPage,
    ServicesPage,
    HomePage,
    AccountPage,
    ParallaxHeaderDirective
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonAffixModule,
    MomentModule,
    IonicModule.forRoot(MyApp, {}, {

      links: [
        { component: HomePage, name: 'HomePage', segment: 'home' },
        { component: ContactPage, name: 'ContactPage', segment: 'contact' },
        { component: AboutPage, name: 'AboutPage', segment: 'about' },
        { component: ServicesPage, name: 'ServicesPage', segment: 'services' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' }
      ]

    }),
    IonicStorageModule.forRoot(),
    CacheModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    AboutPage,
    NewsdetailPage,
    ServicesdetailPage,
    ContactPage,
    ServicesPage,
    AccountPage,
    HomePage
  ],
  providers: [
    StatusBar,
    AuthServiceProvider,
    Network,
    NetworkConnProvider,
    SocialSharing,
    Badge,
    UserData,
    NewsDataProvider,
    ServicesDataProvider,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
