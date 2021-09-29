import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MakeModel } from '../interfaces/make-model';
import { FeatureModel } from '../interfaces/feature-model';
import { VehicleModel } from '../interfaces/vehicle-model';
import { BasicVehicleModel } from '../interfaces/basic-vehicle-model';
import { QueryVehicle } from '../interfaces/query-vehicle';
import { QueryResultModel } from '../interfaces/query-result-model';


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

  getVehicles(filter: QueryVehicle): Observable<QueryResultModel> {
    return this.http.get<QueryResultModel>(this.urlVehicle + '?' + this.optionsQueryString(filter));
  }

  private optionsQueryString(filter: QueryVehicle){
    let parts= [];
    
    if(filter.makeId != null && filter.makeId != undefined){
      parts.push(encodeURIComponent('makeId') + '=' + encodeURIComponent(filter.makeId));
    }
    if(filter.modelId != null && filter.modelId != undefined){
      parts.push(encodeURIComponent('modelId') + '=' + encodeURIComponent(filter.modelId));
    }
    if(filter.sortBy != null && filter.sortBy != undefined){
      parts.push(encodeURIComponent('sortBy') + '=' + encodeURIComponent(filter.sortBy));
    }
    if(filter.isSortAscending != null && filter.isSortAscending != undefined){
      parts.push(encodeURIComponent('isSortAscending') + '=' + encodeURIComponent(filter.isSortAscending));
    }
    if(filter.page != null && filter.page != undefined){
      parts.push(encodeURIComponent('page') + '=' + encodeURIComponent(filter.page));
    }
    if(filter.pageSize != null && filter.pageSize != undefined){
      parts.push(encodeURIComponent('pageSize') + '=' + encodeURIComponent(filter.pageSize));
    }
    return parts.join('&');
  }

  deleteVehicle(vehicleId: string): Observable<VehicleModel> {
    return this.http.delete<VehicleModel>(this.urlVehicle + "/" + vehicleId );
  }

}
