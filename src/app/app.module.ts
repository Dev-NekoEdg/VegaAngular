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
import { AuthModule } from '@auth0/auth0-angular';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ProtectedPageComponent } from './components/protected-page/protected-page.component';

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
    LoagingComponent,
    NavbarComponent,
    ProtectedPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-nekoedg.us.auth0.com',
      clientId: 'k50sTVUOndO8JdfiWP0iCR4otSAjEu7n'
    })
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppHandlerError } // Provider para errores en Angular.
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
