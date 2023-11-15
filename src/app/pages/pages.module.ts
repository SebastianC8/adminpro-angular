import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaunoComponent } from './graficauno/graficauno.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { PipesModule } from '../pipes/pipes.module';
import { DoctorComponent } from './maintenance/doctors/doctor.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraficaunoComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    HospitalsComponent,
    DoctorsComponent,
    DoctorComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraficaunoComponent,
    PagesComponent,
    AccountSettingsComponent
  ]
})
export class PagesModule { }
