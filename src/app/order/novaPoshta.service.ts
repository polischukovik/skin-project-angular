import { Model } from './apiModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NovaPoshtaService {
  private apiUrl = 'https://api.novaposhta.ua/v2.0/json/';
  private apiKey = '6d47ce01626bf190be73dbcd79e673ef';

  constructor(private http: HttpClient) { }

  getCities(contains: string) {
    const body = {
      modelName: 'Address',
      calledMethod: 'getCities',
      methodProperties: {
        FindByString: contains
      },
      apiKey: this.apiKey
    };
    return this.http.post<Response>(this.apiUrl, body)
      .pipe( map( result => result.data) );
  }

  getOutlets(cityRef: string) {
    const body = {
      modelName: 'AddressGeneral',
      calledMethod: 'getWarehouses',
      methodProperties: {
        CityRef: cityRef
      },
      apiKey: this.apiKey
    };
    return this.http.post<Response>(this.apiUrl, body)
      .pipe( map( result => result.data) );
  }

}

interface Response {
  success: string;
  data: [];
}
