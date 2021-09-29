import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleTabComponent } from './components/vehicle-tab/vehicle-tab.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'vehicles/new', component: VehicleFormComponent},
  { path: 'vehicles/:id', component: VehicleFormComponent},
  { path: 'vehicles-view/:id', component: VehicleTabComponent},
  { path: 'vehicles', component: VehicleListComponent},
  { path: 'not-found', component: NotFoundComponent},
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  // { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
