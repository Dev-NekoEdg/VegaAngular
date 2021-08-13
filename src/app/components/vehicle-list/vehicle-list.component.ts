import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicVehicleModel } from 'src/app/interfaces/basic-vehicle-model';
import { MakeModel } from 'src/app/interfaces/make-model';
import { ModelModel } from 'src/app/interfaces/model-model';
import { VehicleModel } from 'src/app/interfaces/vehicle-model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  private emptyBasicVehicleModel = { id: null, 
                                     makeId : null, 
                                     modelId: null,
                                     isRegistered: false,
                                     features: [],
                                     contact : {name: null, phone: null, email: null}
                                    };

  public allVehicles: VehicleModel[] = [];
  public vehicleList: VehicleModel[] = [];
  public filter: BasicVehicleModel = this.emptyBasicVehicleModel;
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
    console.log(this.filter.makeId);
    let makeSelected = this.makes?.find(m => m.id === this.filter.makeId);
    this.models = makeSelected ? makeSelected.models : [];
  }

  onFilterChange(): void{
    console.log(this.filter.makeId);
    let currentVehicle = this.allVehicles;
    if(this.filter.makeId){
      currentVehicle = currentVehicle.filter(v => v.make?.id == this.filter.makeId)
    }

    if(this.filter.modelId){
      currentVehicle = currentVehicle.filter(v => v.make?.id == this.filter.modelId)
    }

    this.vehicleList = currentVehicle;
  }

  resetFilter(): void{
    this.filter = this.emptyBasicVehicleModel;
    this.onFilterChange();

  }

  loadVehicles(): void{
    this.service.getVehicles().subscribe(data=>{
      this.vehicleList = this.allVehicles = data;
    });
  }

  redirectNewVehicle(): void{
    this.router.navigateByUrl('/vehicles/new');
  }

  redirectDetailsVehicle(id: string | null): void{
    this.router.navigate(['vehicles', id]);
  }
}
