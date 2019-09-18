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
  private model: Model = {
    modelName: 'Addresses',
    calledMethod: 'getCities',
    methodProperties: {FindByString: ''},
    apiKey: this.apiKey
  };

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
    return this.http.post<CitiesResponse>(this.apiUrl, body)
      .pipe( map( result => result.data) );
  }

}

interface CitiesResponse {
  success: string;
  data: [];
}
