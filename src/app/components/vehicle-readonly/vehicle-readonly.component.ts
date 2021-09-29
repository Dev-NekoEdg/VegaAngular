import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleModel } from 'src/app/interfaces/vehicle-model';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-readonly',
  templateUrl: './vehicle-readonly.component.html',
  styleUrls: ['./vehicle-readonly.component.css']
})
export class VehicleReadonlyComponent implements OnInit {
  @Input() id: string = '';

  public localForm: FormGroup;
  public vehicle: VehicleModel | null = null;

  constructor(private formBuilder: FormBuilder,
              private service: VehicleService,
              private router: Router) 
   {
    
    this.localForm = this.createForm();
    
  }
  
  ngOnInit(): void {
    this.getVehicle(this.id);
    this.loadForm();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      make: [''],
      model: [''],
      isRegister: [''],
      contactName: [''],
      contactPhone: [''],
      contactEmail: ['']
    });
  }

  loadForm(): void{
    console.log(this.vehicle);
    this.localForm.reset({
      make: this.vehicle?.make?.name,
      model: this.vehicle?.model?.name,
      isRegister: (this.vehicle?.isRegistered ? 'Yes' : 'No'),
      contactName: this.vehicle?.contact?.name,
      contactPhone: this.vehicle?.contact?.phone,
      contactEmail: this.vehicle?.contact?.email
    });

  }


  getVehicle(id: string): void{
    console.log({Id: id});
    this.service.getVehicle(id).subscribe(data=>{
      //console.log(data);
      this.vehicle = data;
      this.loadForm();
    });
    

  }

  deleteVehicle(): void {
    if(confirm('are you sure?')){
      let id: any = this.vehicle?.id;
      this.service.deleteVehicle(this.vehicle?.id!).subscribe(data => {
        if(data){
        Swal.fire({
          icon: 'success',
          title: 'Vehicle deleted.',
          showConfirmButton: false,
          timer: 2500
        });
        this.router.navigate(['vehicles']);
      }
    });
    }
  }

  editVehicle(): void{
    this.router.navigate(['vehicles', this.vehicle?.id]);
  }

  backToVehicle(): void{
    this.router.navigate(['vehicles']);
  }
}
