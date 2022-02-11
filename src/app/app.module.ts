import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { HomeComponent } from './components/home/home.component';
import { AppHandlerError } from './app-handler-error';
import { NotFoundComponent } from './not-found/not-found.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { VehicleTabComponent } from './components/vehicle-tab/vehicle-tab.component';
import { VehicleReadonlyComponent } from './components/vehicle-readonly/vehicle-readonly.component';
import { VehicleLoadFilesComponent } from './components/vehicle-load-files/vehicle-load-files.component';
import { LoagingComponent } from './components/shared/loaging/loaging.component';

@NgModule({
  declarations: [
    AppComponent,
    VehicleFormComponent,
    HomeComponent,
    NotFoundComponent,
    VehicleListComponent,
    PaginationComponent,
    VehicleTabComponent,
    VehicleReadonlyComponent,
    VehicleLoadFilesComponent,
    LoagingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppHandlerError } // Provider para errores en Angular.
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
