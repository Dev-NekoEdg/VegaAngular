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

@NgModule({
  declarations: [
    AppComponent,
    VehicleFormComponent,
    HomeComponent,
    NotFoundComponent,
    VehicleListComponent
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
