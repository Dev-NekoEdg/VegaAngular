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

  upload(vehicleId: string, photo: File): Observable<any> {
    var formData = new FormData();
    // "file" es el nombre que está en el controller. Se debe de nombrar de la misma forma que está el parámetro.
    formData.append('file', photo);
    return this.http.post(`http://localhost:64026/api/vehicles/${vehicleId}/photos`, formData);
  }

  getAll(vehicleId: string): Observable<any> {
    return this.http.get(`http://localhost:64026/api/vehicles/${vehicleId}/photos`);
  }


}
