import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  
  private urlVehicle: string = "http://localhost:64026/api/vehicle";

  constructor(
    private http: HttpClient
  ) { 

  }


  upload(vehicleId:string, photo: File): Observable<any>{
    var formData = new FormData();
    // "file" es el nombre que está en el controller.
    formData.append('file', photo);
  return this.http.post(`http://localhost:64026/api/vehicles/${vehicleId}/photos`, formData);
  }

}
