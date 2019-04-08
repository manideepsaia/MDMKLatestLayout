import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapDocumentsService {

  constructor(private http : HttpClient) { }

  create(formData){
    let headers = new HttpHeaders();
   
   
    headers.append('Accept', "multipart/form-data")
      
        let options = ({ headers: headers });
       
      console.log("In Service.ts: formData....",formData.get('FormValue'));
      console.log("In Service.ts: headers are: ",options);
      console.log(' calling post method with url /api/mapdocuments ');
      return this.http.post('/api/mapdocuments',formData,options)
      .subscribe(response=>{
        console.log("response is "+JSON.stringify(response));
        });
        
  }
}