import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MakeModel } from '../interfaces/make-model';
import { FeatureModel } from '../interfaces/feature-model';
import { VehicleModel } from '../interfaces/vehicle-model';
import { BasicVehicleModel } from '../interfaces/basic-vehicle-model';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private urlApiMakes: string = 'http://localhost:64026/api/Make';
  private urlApiFeatures: string = 'http://localhost:64026/api/feature';
  private urlVehicle: string = "http://localhost:64026/api/vehicle";

  constructor(
    private http: HttpClient
  ) { }


  getMakesWithModels(): Observable<MakeModel[]> {
    return this.http.get<MakeModel[]>(this.urlApiMakes);
  }

  getFeatures(): Observable<FeatureModel[]>{
    return this.http.get<FeatureModel[]>(this.urlApiFeatures);
  }

  insertVehicle(vehicle: BasicVehicleModel): Observable<VehicleModel> {
    return this.http.post<VehicleModel>(this.urlVehicle, vehicle );
  }

  updateVehicle(vehicle: BasicVehicleModel): Observable<VehicleModel> {
    return this.http.put<VehicleModel>(this.urlVehicle+ "/" + vehicle.id, vehicle );
  }

  getVehicle(vehicleId: string): Observable<VehicleModel> {
    return this.http.get<VehicleModel>(this.urlVehicle+ "/" + vehicleId );
  }

  getVehicles(): Observable<VehicleModel[]> {
    return this.http.get<VehicleModel[]>(this.urlVehicle);
  }

  deleteVehicle(vehicleId: string): Observable<VehicleModel> {
    return this.http.delete<VehicleModel>(this.urlVehicle + "/" + vehicleId );
  }

}
