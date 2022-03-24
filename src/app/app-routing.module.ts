import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { HomeComponent } from './components/home/home.component';
import { ProtectedPageComponent } from './components/protected-page/protected-page.component';
import { LoagingComponent } from './components/shared/loaging/loaging.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleTabComponent } from './components/vehicle-tab/vehicle-tab.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'vehicles/new', component: VehicleFormComponent},
  { path: 'vehicles/:id', component: VehicleFormComponent},
  { path: 'vehicles-view/:id', component: VehicleTabComponent},
  { path: 'vehicles', component: VehicleListComponent},
  { path: 'protected', component: ProtectedPageComponent, canActivate: [AuthGuard]},
  { path: 'not-found', component: NotFoundComponent},
  { path: 'prueba', component: LoagingComponent},
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  // { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
