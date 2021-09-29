import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-tab',
  templateUrl: './vehicle-tab.component.html',
  styleUrls: ['./vehicle-tab.component.css']
})
export class VehicleTabComponent implements OnInit {
  public vehicleId: string='';
  constructor(private activeRouter: ActivatedRoute) 
  {
    activeRouter.params.subscribe(p=> {
      this.vehicleId = p['id']; // +p['id'] para convertir en int se coloca el +.
      console.log(this.vehicleId);
    });
   }

  ngOnInit(): void {
  }

}
