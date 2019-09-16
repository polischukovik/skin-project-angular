import { Model } from './apiModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class NovaPoshtaService {
    private apiUrl = "https://api.novaposhta.ua/v2.0/json/";
    private apiKey = "6d47ce01626bf190be73dbcd79e673ef";
    private model: Model = {
        modelName: "Addresses",
        calledMethod: "getCities",
        apiKey: this.apiKey
      }
      
    constructor(private http: HttpClient) { }

    getCities(){
        
    }

}