import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class ServicesDataProvider {

  data: any;
  services: Observable<any>;
  servicesKey = 'services';

  // get url of api for events
  url: string = 'http://nowizzville.com/api/services';

   // Specify custom TTL if you want
  ttl: number = 5;

  constructor(public http: HttpClient, private cache: CacheService) {}
  
  // load events api
  loadServices(): any {

  if (this.data) {
      // already loaded data
      return Observable.of(this.data);
    }

    else {

     let delayType = 'all';

     let req = this.http.get(this.url)
        .map(this.processData, this);

     return this.cache.loadFromDelayedObservable(this.url, req, this.servicesKey, this.ttl, delayType);

  }

}


  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to events
    this.data = data;
    // loop through each day in the event
    this.data.services.forEach((provider: any) => {
      // loop through each timeline group in the day
      provider.groups.forEach((group: any) => {
        // loop through each event in the timeline group
        group.providers.forEach((cover: any) => {
        });
      });
    });

    return this.data;
  }

getServices(providerIndex: number, queryText = '') {

    return this.loadServices().map((data: any) => {
      let provider = data.services[providerIndex];
      provider.shownProviders = 0;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

      provider.groups.forEach((group: any) => {
        group.hide = true;

        group.providers.forEach((event: any) => {
          // check if this provider should show or not
          this.filterServices(event, queryWords);

          if (!event.hide) {
            // if this provider is not hidden then this group should show
            group.hide = false;
            provider.shownProviders++;
          }
        });

      });

      return provider;

    })

  }

  filterServices(service_item: any, queryWords: string[]) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the news name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (service_item.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this news passes the query test
      matchesQueryText = true;
    }

     let matchesSegment = false;
      matchesSegment = true;
    

    // all tests must be true if it should not be hidden
    service_item.hide = !(matchesQueryText && matchesSegment);

  }

}
