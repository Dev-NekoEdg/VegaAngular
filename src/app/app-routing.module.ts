import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'vehicles/new', component: VehicleFormComponent, pathMatch: 'full'},
  { path: 'vehicles/:id', component: VehicleFormComponent},
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
