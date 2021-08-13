import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { MakeModel } from 'src/app/interfaces/make-model';
import { ModelModel } from 'src/app/interfaces/model-model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { VehicleModel } from 'src/app/interfaces/vehicle-model';
import { FeatureModel } from 'src/app/interfaces/feature-model';
import { BasicVehicleModel } from 'src/app/interfaces/basic-vehicle-model';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { ContactModel } from 'src/app/interfaces/contact-model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  public makes: MakeModel[] | null = null;
  public models: ModelModel[] | null = null;
  public features: FeatureModel[] | null = null;


  public vehicle: BasicVehicleModel = { 
    id: null,
    makeId: null,
    modelId: null, 
    isRegistered: false, 
    features: [], 
    contact: null 
  };

  public vehicleComplete:VehicleModel = {
    id: null,
    make: null,
    model: null,
    isRegistered: null,
    features: [],
    contact: null
  };

  public localForm: FormGroup;

  //public makeId: string = '';


  constructor(
    private service: VehicleService,
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {

    activeRouter.params.subscribe(p=> {
      this.vehicle.id = p['id']; // +p['id'] para convertir en int se coloca el +.
    });
    
    //this.loadVehicle();
    this.localForm = this.loadForm();
  }
  
  get arrayFeatures() {
    return this.localForm.get('features') as FormArray;
  }
  
  ngOnInit(): void {
    this.loadAll();
    this.loadVehicle();
  }

  get validatorMake() {
    return this.localForm.get('make')?.invalid && this.localForm.get('make')?.touched;
  }

  get validatorModel() {
    return this.localForm.get('model')?.invalid && this.localForm.get('model')?.touched;
  }

  get validatorIsRegister() {
    return this.localForm.get('isRegister')?.invalid && this.localForm.get('isRegister')?.touched;
  }

  get validatorFeature() {
    var controls = this.localForm.get('feature') as FormArray;
    return this.localForm.get('feature')?.touched && controls.length <= 0;
  }

  get validatorName() {
    return this.localForm.get('name')?.invalid && this.localForm.get('name')?.touched;
  }

  get validatorPhone() {
    return this.localForm.get('phone')?.invalid && this.localForm.get('phone')?.touched;
  }

  get validatorEmail() {
    return this.localForm.get('email')?.invalid && this.localForm.get('email')?.touched;
  }

  get validatorForm(){
    return this.localForm.valid;
  }

  loadForm(): FormGroup {

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

  loadAll(): void{
    // forkJoin te permite hacer un suscribe a un array de observables.
    forkJoin({
      responseOne: this.service.getMakesWithModels(),
      responseTwo: this.service.getFeatures(),
      //responseThree: this.service.getVehicle(this.vehicle.id ?? '0')

    }).subscribe(({ responseOne, responseTwo }) => {
      this.makes = responseOne;
      this.features = responseTwo;
      //this.vehicleComplete = responseThree;
    });
  }

  loadMakes(): void {
    this.service.getMakesWithModels().subscribe(
      (response) => this.makes = response
    );
  }

  loadFeatures(): void {
    this.service.getFeatures().subscribe(
      (response) => this.features = response
    );
  }

  loadVehicle(): void {
    console.log({ loadVehicle: this.vehicle.id });
    if (this.vehicle.id)
    {
      this.service.getVehicle(this.vehicle.id).subscribe(data=>{
        //console.log(data);
        this.vehicleComplete = data;
        console.log(this.vehicleComplete);
        this.loadBasicVehicle(this.vehicleComplete);
        this.setDataFromForm();
        this.onMakeChange();
      }, (error)=>{
        if(error.status == 404){
          this.router.navigate(['/not-found']);
        }
      });
    }
  }

  // Non-null assertion operator ! para que TS confie en que le va llegar un dato.
  private loadBasicVehicle(v: VehicleModel): void{
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make!.id;
    this.vehicle.modelId = v.model!.id;
    this.vehicle.isRegistered= v.isRegistered!;
    this.vehicle.contact = v.contact;
    this.vehicle.features = v.features!.map(x => x.id) ;
  }

  onCheckboxChange(e: any) {
    const checkboxList: FormArray = this.localForm.get('feature') as FormArray;
  
    if (e.target.checked) {
      checkboxList.push(new FormControl(e.target.value));
    } else {
       const index = checkboxList.controls.findIndex(x => x.value === e.target.value);
       checkboxList.removeAt(index);
    }
  }

  onMakeChange(): void {
    this.vehicle.makeId = this.localForm.get('make')?.value;
    console.log(this.vehicle.makeId);
    let makeSelected = this.makes?.find(m => m.id === this.vehicle.makeId);
    this.models = makeSelected ? makeSelected.models : [];
  }

  private setDataFromForm(): void{
    this.localForm.get('make')?.setValue(this.vehicle.makeId);
    this.localForm.get('model')?.setValue(this.vehicle.modelId);
    this.localForm.get('isRegister')?.setValue(this.vehicle.isRegistered);
    //this.vehicle.features = this.getFeatures();

    this.localForm.get('name')?.setValue(this.vehicle.contact?.name);
    this.localForm.get('phone')?.setValue(this.vehicle.contact?.phone);
    this.localForm.get('email')?.setValue(this.vehicle.contact?.email);

  }

  private getDataFromForm(): void{
    this.vehicle.makeId =  this.localForm.get('make')?.value;
    this.vehicle.modelId = this.localForm.get('model')?.value;
    this.vehicle.isRegistered = this.localForm.get('isRegister')?.value;
    this.vehicle.features = this.getFeatures();

    let contact: ContactModel = {
      name: this.localForm.get('name')?.value,
      phone: this.localForm.get('phone')?.value,
      email: this.localForm.get('email')?.value,

    };
    this.vehicle.contact =  contact;
  }

  getFeatures(): string[]{
    let features: string[] = [];
    const controls: FormArray = this.localForm.get('feature') as FormArray;
    
    for (let index = 0; index < controls.length; index++) {
      const element = controls.at(index);
      features.push(element.value);
    }

    return features;
  }

  deleteVehicle(){
    if(this.vehicle.id){

      // this.service.deleteVehicle(this.vehicle.id).subscribe(data => {
      //   if(data){
          Swal.fire({
            icon: 'success',
            title: 'Vehicle deleted.',
            showConfirmButton: false,
            timer: 2500
          });
          this.router.navigate(['home']);
        //}
      //});
    }
  }

  saveVehicle(){
    
    this.getDataFromForm();
    this.vehicle.isRegistered = this.vehicle.isRegistered.toString() == "true";
    
    console.log(this.localForm);
    console.log(this.vehicle);
    
    Swal.fire({
      allowOutsideClick: false,
      title: 'Procesing'
    });
    Swal.showLoading();
    
    if(this.vehicle.id){
      this.service.updateVehicle(this.vehicle).subscribe(data => {
        console.log(data)
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Vehicle updated',
          showConfirmButton: false,
          timer: 2500
        });
      });
    } 
    else{
      this.service.insertVehicle(this.vehicle).subscribe(data => {
        console.log(data)
        Swal.close();
      });
    }
  }

}
