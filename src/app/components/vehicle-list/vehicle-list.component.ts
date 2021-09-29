import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicVehicleModel } from 'src/app/interfaces/basic-vehicle-model';
import { MakeModel } from 'src/app/interfaces/make-model';
import { ModelModel } from 'src/app/interfaces/model-model';
import { QueryResultModel } from 'src/app/interfaces/query-result-model';
import { QueryVehicle } from 'src/app/interfaces/query-vehicle';
import { VehicleModel } from 'src/app/interfaces/vehicle-model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  private DEFAULT_PAGE: number  = 1;
  private DEFAULT_PAGESIZE: number  = 3;

  private emptyBasicVehicleModel = { id: null,
                                     makeId : null,
                                     modelId: null,
                                     isRegistered: false,
                                     features: [],
                                     contact : {name: null, phone: null, email: null}
                                    };

  private emptyQuery={
    makeId : '',
    modelId: '',
    sortBy: '',
    isSortAscending: false,
    page: this.DEFAULT_PAGE,
    pageSize: this.DEFAULT_PAGESIZE
  };

  //public allVehicles: VehicleModel[] = [];
  public vehicleList: QueryResultModel = { totalItems:0, items: []};
  public query: QueryVehicle;
  public makes: MakeModel[] = [];
  public models: ModelModel[] = [];
  public localForm: FormGroup;

  constructor(
    private service: VehicleService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private fb: FormBuilder
    ) {
      this.localForm = this.loadForm();
      this.query = this.emptyQuery;
     }

  ngOnInit(): void {
    this.loadVehicles();
    this.loadMakes();
  }

  loadForm(): FormGroup{
    return this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      isRegister: ['', Validators.required],
      feature: this.fb.array([]),
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  loadMakes(): void {
    this.service.getMakesWithModels().subscribe(
      (response) => this.makes = response
    );
  }

  onMakeChange(): void {
    //this.filter.makeId = this.localForm.get('make')?.value;
    console.log(this.query.makeId);
    let makeSelected = this.makes?.find(m => m.id === this.query.makeId);
    this.models = makeSelected ? makeSelected.models : [];
  }

  onFilterChange(): void{
    // console.log(this.filter.makeId);
    // let currentVehicle = this.allVehicles;
    // if(this.filter.makeId){
    //   currentVehicle = currentVehicle.filter(v => v.make?.id == this.filter.makeId)
    // }
    // if(this.filter.modelId){
    //   currentVehicle = currentVehicle.filter(v => v.make?.id == this.filter.modelId)
    // }
    // this.vehicleList = currentVehicle;
    this.query.page = this.DEFAULT_PAGE;
    this.service.getVehicles(this.query).subscribe(data=>{
      this.vehicleList = data;
    });
  }

  resetFilter(): void{
    console.log('reset');
    this.query.makeId = '';
    this.query = this.emptyQuery;
    console.log(this.query);
    this.onFilterChange();
  }

  loadVehicles(): void{
    console.log({loadVehicles: this.query});
    this.service.getVehicles(this.query).subscribe(data=>{
      //this.vehicleList = this.allVehicles = data; // se comenta porqué ya se está filtrando  en el servidor.
      this.vehicleList = data;
    });
  }

  redirectNewVehicle(): void{
    this.router.navigateByUrl('/vehicles/new');
  }

  redirectEditVehicle(id: string | null): void{
    this.router.navigate(['vehicles', id]);
  }

  redirectDetailsVehicle(id: string | null): void{
    this.router.navigate(['vehicles-view', id]);
  }

  sortBy(columnName: string): void {
    console.log(columnName);
    console.log(this.query.isSortAscending);

    if(this.query.sortBy === columnName){
      this.query.isSortAscending = !this.query.isSortAscending;
    }
    else{
      this.query.sortBy = columnName
      this.query.isSortAscending = !this.query.isSortAscending;
    }

    this.loadVehicles();
  }

  onPageChange(page: number){
    console.log(page);
    this.query.page = page;

    this.loadVehicles();

  }
}
